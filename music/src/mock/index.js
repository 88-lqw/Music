import Mock from 'mockjs';

Mock.mock('api.netMusic.com/category', (option) => {
  // eslint-disable-next-line no-param-reassign
  option.body = JSON.parse(option.body);
  if (option.body.type === 0) {
    return [
      { iconClass: require('../icon02/siren.png'), text: '私人FM' },
      { iconClass: require('../icon02/meirituijian.png'), text: '每日推荐', url: '/rec' },
      { iconClass: require('../icon02/gedan.png'), text: '歌单', url: '/songmenu' },
      { iconClass: require('../icon02/paihangbang.png'), text: '排行榜' }];
  }
  return [
    { iconClass: require('../icon02/type.png'), text: '电台分类' },
    { iconClass: require('../icon02/paihang.png'), text: '电台排行' },
    { iconClass: require('../icon02/nofree.png'), text: '付费精品' },
    { iconClass: require('../icon02/class.png'), text: '音乐课堂' }];
});
Mock.mock('api.netMusic.com/menuBar', (option) => {
  // eslint-disable-next-line no-param-reassign
  option.body = JSON.parse(option.body);
  return [
    { iconClass: 'iconfont icon-faxian', text: '发现', url: '/recommend' },
    { iconClass: 'iconfont icon-shipin', text: '视频', url: '/vision' },
    { iconClass: 'iconfont icon-yinyue', text: '我的', url: '/my' },
    { iconClass: 'iconfont icon-dilanxianxingiconyihuifu_huabanfuben', text: '朋友', url: '/trends' },
    { iconClass: 'iconfont icon-account', text: '帐号', url: '/account' }];
});

