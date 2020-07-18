browser.contextMenus.create({
  title: 'Select tabs from matching domain',
  contexts: ['tab'],
  onclick: async (event, tab) => {
    const url = new URL(tab.url)
    const matcher = (['http:', 'https:'].includes(url.protocol) ? '*://' : url.protocol) + (url.host ? url.host + '/' : '') + '*'
    const tabs = [tab.index].concat((await browser.tabs.query({ windowId: tab.windowId, url: matcher })).map(tab => tab.index))
    browser.tabs.highlight({
      windowId: tab.windowId,
      populate: false,
      tabs: tabs
    })
  }
})
