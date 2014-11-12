module.exports = {
  'Comments Textarea' : function (browser) {
    browser
      .url('http://degree-checker.herokuapp.com/admin/view')
      .waitForElementVisible('.admin-section', 1000)
      .assert.elementPresent('.comments')
      .end();
  },
  'Save Button' : function (browser) {
    browser
      .url('http://degree-checker.herokuapp.com/admin/view')
      .waitForElementVisible('.admin-section', 1000)
      .assert.elementPresent('.admin-section .btn-primary')
      .end();
  },
  'Add Modal' : function (browser) {
    browser
      .url('http://degree-checker.herokuapp.com/admin/view')
      .waitForElementVisible('body', 1000)
      .click('.fa-plus')
      .isVisible('.modal-dialog', function(result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.status, 0);
        this.assert.equal(result.value, true);
      })
      .end();
  },
  'Requirements Sidebar' : function (browser) {
    browser
      .url('http://degree-checker.herokuapp.com/admin/view')
      .isVisible('.requirements', function(result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.status, 0);
        this.assert.equal(result.value, true);
      })
      .end();
  }
};