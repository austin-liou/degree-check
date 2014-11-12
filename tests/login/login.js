module.exports = {
  'Login Button' : function (browser) {
    browser
      .url('http://degree-checker.herokuapp.com')
      .waitForElementVisible('.hero .container a', 1000)
      .getText('.hero .container a', function(result) {
        this.assert.equal(result.value, 'Login w/ CalNet');
      })
      .end();
  },
  'CalNet Login' : function (browser) {
    browser
      .url('http://degree-checker.herokuapp.com')
      .url('http://degree-checker.herokuapp.com/login')
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('#loginForm')
      .end();
  }
};