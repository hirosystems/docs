module.exports = async function alltiusPlugin(_context, options) {
  return {
    name: 'alltius-plugin',
    injectHtmlTags() {
      return {
        headTags: [
`<!-- Start Alltius Config -->
<script> (() => {const p=(l,s,a,i)=>{const n=()=>{if(!s.getElementById(a)){const e=s.getElementsByTagName(i)[0],t=s.createElement(i);t.type="text/javascript",t.async=!1,t.src="https://app.alltius.ai/alltiusSDK.js",t.id=a,e&&e.parentNode?e.parentNode.insertBefore(t,e):s.body.appendChild(t)}};if(!l.AlltiusSDK){const e=(...t)=>{e.q.push(t)};e.q=[],l.AlltiusSDK=e,s.readyState==="complete"?n():l.addEventListener("load",n)}};p(window,document,"alltius-sdk","script");})()
window.AlltiusSDK = {
  q: [
    [
      'configure',
      {
        metatadata: {
          widgetId: '64ef58020ada4eb2fb38ea9b',
        },
      },
    ],
  ],
}; </script>
<!-- End Alltius Config -->`,
        ],
        postBodyTags: [
        ],
      };
    },
  };
};
