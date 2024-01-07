describe("xpath", function() {
  it('should generate indices for all elements with siblings', function() {
    var struct = $('<div>')
      .append($('<ul>')
        .append($('<li>'))
        .append($('<li>')
          .append($('<a>')
            .append($('<span>'))
            .append($('<span>'))
          )
          .append($('<a>'))
        )
        .append($('<li>'))
      );
      
    expect(struct.find('span').xpath()).toEqual('/div/ul/li[2]/a[1]/span[1]');
  });

});