module.exports = {
  'Add Modal' : function (browser) {
    browser
      .url('http://localhost:9000/scheduler')
      .waitForElementVisible('body', 1000)
      .click('.fa-plus')
      .isVisible('.modal-dialog', function(result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.status, 0);
        this.assert.equal(result.value, true);
      })
      .end();
  },
  'Delete Modal' : function (browser) {
    browser
      .url('http://localhost:9000/scheduler')
      .waitForElementVisible('body', 1000)
      .click('.fa-trash')
      .isVisible('.modal-dialog', function(result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.status, 0);
        this.assert.equal(result.value, true);
      })
      .end();
  }
  // 'Add Course' : function (browser) {
  //   browser
  //     .url('http://localhost:9000/scheduler')
  //     .setValue('input[type=text]', 'CS 160')
  //     .end();
  // },
  // 'Remove Course' : function (browser) {
  //   browser
  //     .url('http://localhost:9000/scheduler')
  //     .waitForElementVisible('body', 1000)
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .click('.remove-class')
  //     .waitForElementNotPresent('.remove-class', 1000)
  //     .end();
  // },
  // 'Requirements Sidebar' : function (browser) {
  //   browser
  //     .url('http://localhost:9000/scheduler')
  //     .waitForElementVisible('.requirements', 1000)
  //     .assert.containsText('.requirements', 'CS 160')
  //     .assert.containsText('.requirements', 'CS 61A')
  //     .assert.containsText('.requirements', 'CS 61B')
  //     .assert.containsText('.requirements', 'CS 61C')
  //     .end();
  // }
};