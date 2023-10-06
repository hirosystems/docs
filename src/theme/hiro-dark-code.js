module.exports = {
  plain: {
    color: '#9CDCFE',
    backgroundColor: '#000000',
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#666',
      },
    },
    {
      types: ['builtin', 'changed', 'keyword', 'interpolation-punctuation'],
      style: {
        color: '#BC812E',
      },
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: '#FF9ECF',
      },
    },
    {
      types: ['constant'],
      style: {
        color: '#FF9ECF',
      },
    },
    {
      types: ['attr-name', 'variable'],
      style: {
        color: '#B3D9FF',
      },
    },
    {
      types: ['deleted', 'string', 'attr-value', 'template-punctuation'],
      style: {
        color: '#FF9ECF',
      },
    },
    {
      types: ['selector'],
      style: {
        color: 'rgb(215, 186, 125)',
      },
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: 'rgb(78, 201, 176)',
      },
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: 'rgb(86, 156, 214)',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'rgb(212, 212, 212)',
      },
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#808080',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#C2EBC4',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#F2F0ED',
      },
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)',
      },
    },
  ],
};
