export default {
  hero: {
    title: 'Get started',
    image: {
      src: '/img/landing/hero.png',
      alt: 'web3 illustration image',
    },
    text: "Get started with the following quickstarts to set up and use Hiro's products",
    links: [
      {
        text: 'Set up local Development Environment',
        href: '/clarinet/how-to-guides/how-to-set-up-local-development-environment',
      },
      {
        text: 'Add new Contract',
        href: '/clarinet/how-to-guides/how-to-add-contract',
      },
      {
        text: 'Test Contract',
        href: '/clarinet/how-to-guides/how-to-test-contract',
      },
    ],
  },
  popularSections: {
    title: 'Popular sections',
    sections: [
      {
        title: 'Stacks blockchain API',
        text: 'Stacks blockchain API allows you to query the Stacks blockchain and interact with smart contracts.',
        href: '/stacks-blockchain-api/overview',
        image: {
          src: '/img/landing/api.png',
          alt: 'web3 APIs illustration image',
        },
      },
      {
        title: 'What is Clarinet?',
        text: 'Clarinet is a command line tool for Clarity smart contract development.',
        href: '/clarinet/introduction',
        image: {
          src: '/img/landing/clarinet.png',
          alt: 'sBTC illustration image',
        },
      },
      {
        title: 'Stacks.js',
        text: 'Stacks.js is an SDK with a collection of JavaScript libraries to interact with and transact on the Stacks blockchain.',
        href: '/stacks.js/overview',
        image: {
          src: '/img/landing/stackjs.png',
          alt: 'Abstract blockchain illustration image',
        },
      },
    ],
  },
  sections: [
    {
      title: 'Clarinet',
      image: {
        src: '/img/landing/clarity-logo.svg',
        alt: 'Clarity logo',
      },
      description:
        'Clarinet is a command line tool for Clarity smart contract development that provides a CLI package with a clarity runtime, a console, and a testing harness.',
      subSections: [
        {
          title: 'Getting started',
          link: '/clarinet/getting-started',
          description:
            'Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus.',
        },
        {
          title: 'Feature guides',
          link: '/clarinet/feature-guides/analyze-with-check-checker',
          description:
            'Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus.',
        },
        {
          title: 'Troubleshooting',
          link: '/clarinet/troubleshooting',
          description:
            'Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus.',
        },
      ],
    },
    {
      title: 'Explorer',
      image: {
        src: '/img/landing/stacks-logo.svg',
        alt: 'Stacks logo',
      },
      description:
        'Stacks blockchain API allows you to query the Stacks blockchain and interact with smart contracts.',
      subSections: [
        {
          title: 'Overview',
          link: '/explorer/overview',
          description:
            'Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus.',
        },
        {
          title: 'Getting started',
          link: '/explorer/getting-started',
          description:
            'Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus.',
        },
        {
          title: 'Build explorer',
          link: '/explorer/how-to-guides/build-explorer',
          description:
            'Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus.',
        },
      ],
    },
  ],
};
