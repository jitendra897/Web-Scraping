(function(){
  // listen for context menu
  var contextNode;
  addEventListener("contextmenu", function(e) {
    contextNode = e.srcElement;
  });
  
  // listen for requests
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var command = request.command,
        payload = request.payload,
        response = $.extend({}, payload);

    try {
      if (command === 'scraperScrape') {
        // scrape
        response.result = bit155.scraper.scrape(response);
      } else if (command === 'scraperSelectionOptions') {
        // selection options
        (function(){
          var focusNode,
              anchorNode, 
              selectionDocument,
              selection;
              
          // abort if no contextNode as probably being invoked from another
          // frame
          if (!contextNode) {
            response.error = "Frames are not supported at the moment. Please open the frame in a new tab or window and try scraping again.";
            return;
          }
          
          // determine range of selection
          selection = window.getSelection();
          selectionDocument = window.document;
          if (selection.isCollapsed) {
            // nothing selected, so use whatever node is under the cursor
            focusNode = contextNode;
          } else {
            // select focus and anchor nodes from selection
            focusNode = selection.focusNode;
            anchorNode = selection.anchorNode;
          }
          
          // clear context node
          contextNode = null;
          
          // extend response with options generated from current selection
          response = $.extend(response, bit155.scraper.optionsForSelection(focusNode, anchorNode, selectionDocument));
        }());
      } else if (command === 'scraperHighlight') {
        // highlight
        (function() {
          var elements;

          if (payload.selector) {
            elements = bit155.scraper.select(document, payload.selector, payload.language);
          } else if (payload.xpath) {
            elements = bit155.scraper.select(document, payload.xpath, 'xpath');
          } else if (payload.jquery) {
            elements = $(payload.jquery);
          }

          if (elements) {
            window.scrollTo(elements.offset().left, elements.offset().top);
            elements.filter(':visible').effect('highlight', {}, 'slow');
          }          
        }());
      } else if (command === 'scraperPing') {
        // ping
      } else {
        throw new Error('Unsupported request: ' + JSON.stringify(request));
      }
    } catch (error) {
      console.error(error);
      response.error = error;
    }

    sendResponse(response);
  });  
}());
