describe("serializeParams", function() {
  it('should ignore malformed names', function() {
    var form = $('<form><input name="foo[" value="bar"></form>');
    var params = form.serializeParams();
    
    expect(params).toEqual({
      'foo[': 'bar'
    });
  });
  
  it('should deal with typical names', function() {
    var form = $('<form>')
      .append($('<input name="foo" value="bar">'))
      .append($('<input name="jabber" value="wocky">'));
    var params = form.serializeParams();
    
    expect(params).toEqual({
      foo: 'bar',
      jabber: 'wocky'
    });
  });
  
  it('should create array for multiple values', function() {
    var form = $('<form>')
      .append($('<input name="foo" value="bar">'))
      .append($('<input name="foo" value="wocky">'));
    var params = form.serializeParams();
    
    expect(params).toEqual({
      foo: ['bar', 'wocky']
    });
  });

  it('should collect collisions in a different place if there are empty brackets', function() {
    var form = $('<form>')
      .append($('<input name="attributes[][name]" value="name1">'))
      .append($('<input name="attributes[][type]" value="type1">'))
      .append($('<input name="attributes[][name]" value="name2">'))
      .append($('<input name="attributes[][type]" value="type2">'));
    var params = form.serializeParams();
    
    expect(params).toEqual({
      'attributes': [
        { name: 'name1', type: 'type1' },
        { name: 'name2', type: 'type2' }
      ]
    });
  });
});