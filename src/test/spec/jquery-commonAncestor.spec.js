describe('commonAncestor', function() {
  it('should select common ancestor of two siblings', function() {
    var table1 = $('<table>');
    var table1_tr1 = $('<tr>').appendTo(table1);
    var table1_tr1_td1 = $('<td>').appendTo(table1_tr1);
    var table1_tr1_td2 = $('<td>').appendTo(table1_tr1);
    var table1_tr1_td2_p = $('<p>').appendTo(table1_tr1_td2);
    
    expect($(table1_tr1_td1, table1_tr1_td1).commonAncestor().get(0)).toEqual(table1_tr1.get(0));
  });

  it('should select common ancestor of element and its aunt', function() {
    var table1 = $('<table>');
    var table1_tr1 = $('<tr>').appendTo(table1);
    var table1_tr1_td1 = $('<td>').appendTo(table1_tr1);
    var table1_tr1_td2 = $('<td>').appendTo(table1_tr1);
    var table1_tr1_td2_p = $('<p>').appendTo(table1_tr1_td2);
    
    expect($(table1_tr1_td1, table1_tr1_td2_p).commonAncestor().get(0)).toEqual(table1_tr1.get(0));
  });
  
  it('should select parent as common ancestor of element and its parent', function() {
    var table1 = $('<table>');
    var table1_tr1 = $('<tr>').appendTo(table1);
    var table1_tr1_td1 = $('<td>').appendTo(table1_tr1);
    var table1_tr1_td2 = $('<td>').appendTo(table1_tr1);
    var table1_tr1_td2_p = $('<p>').appendTo(table1_tr1_td2);
    
    expect($(table1_tr1_td1, table1_tr1).commonAncestor().get(0)).toEqual(table1_tr1.get(0));
  });

  it('should select no common ancestor of unrelated elements', function() {
    var table1_tr1_td1 = $('<td>');
    var table1_tr1_td2 = $('<td>');
    
    expect($(table1_tr1_td1, table1_tr1_td1).commonAncestor().get(0)).toBeUndefined();
  });
  
});