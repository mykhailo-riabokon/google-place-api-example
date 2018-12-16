// More details https://developers.google.com/maps/faq#languagesupport
// https://developers.google.com/maps/documentation/javascript/localization#Language

const list = [
  {
    value: 'ar',
    title: 'Arabic',
  },
  {
    value: 'lt',
    title: 'Lithuanian',
  },
  {
    value: 'be',
    title: 'Belarusian',
  },
  {
    value: 'lv',
    title: 'Latvian',
  },
  {
    value: 'bg',
    title: 'Bulgarian',
  },
  {
    value: 'mk',
    title: 'Macedonian',
  },
  {
    value: 'bn',
    title: 'Bengali',
  },
  {
    value: 'ml',
    title: 'Malayalam',
  },
  {
    value: 'ca',
    title: 'Catalan',
  },
  {
    value: 'mr',
    title: 'Marathi',
  },
  {
    value: 'cs',
    title: 'Czech',
  },
  {
    value: 'my',
    title: 'Burmese',
  },
  {
    value: 'da',
    title: 'Danish',
  },
  {
    value: 'nl',
    title: 'Dutch',
  },
  {
    value: 'de',
    title: 'German',
  },
  {
    value: 'no',
    title: 'Norwegian',
  },
  {
    value: 'el',
    title: 'Greek',
  },
  {
    value: 'pa',
    title: 'Punjabi',
  },
  {
    value: 'en',
    title: 'English',
  },
  {
    value: 'pl',
    title: 'Polish',
  },
  {
    value: 'en-Au',
    title: 'English (Australian)',
  },
  {
    value: 'pt',
    title: 'Portuguese',
  },
  {
    value: 'en-GB',
    title: 'English (Great Britain)',
  },
  {
    value: 'pt-BR',
    title: 'Portuguese (Brazil)',
  },
  {
    value: 'es',
    title: 'Spanish',
  },
  {
    value: 'pt-PT',
    title: 'Portuguese (Portugal)',
  },
  {
    value: 'eu',
    title: 'Basque',
  },
  {
    value: 'ro',
    title: 'Romanian',
  },
  {
    value: 'fa',
    title: 'Farsi',
  },
  {
    value: 'ru',
    title: 'Russian',
  },
  {
    value: 'fi',
    title: 'Finnish',
  },
  {
    value: 'sk',
    title: 'Slovak',
  },
  {
    value: 'fil',
    title: 'Filipino',
  },
  {
    value: 'sl',
    title: 'Slovenian',
  },
  {
    value: 'fr',
    title: 'French',
  },
  {
    value: 'sq',
    title: 'Albanian',
  },
  {
    value: 'gl',
    title: 'Galician',
  },
  {
    value: 'sr',
    title: 'Serbian',
  },
  {
    value: 'gu',
    title: 'Gujarati',
  },
  {
    value: 'sv',
    title: 'Swedish',
  },
  {
    value: 'hi',
    title: 'Hindi',
  },
  {
    value: 'ta',
    title: 'Tamil',
  },
  {
    value: 'hr',
    title: 'Croatian',
  },
  {
    value: 'te',
    title: 'Telugu',
  },
  {
    value: 'hu',
    title: 'Hungarian',
  },
  {
    value: 'th',
    title: 'Thai',
  },
  {
    value: 'id',
    title: 'Indonesian',
  },
  {
    value: 'tl',
    title: 'Tagalog',
  },
  {
    value: 'it',
    title: 'Italian',
  },
  {
    value: 'tr',
    title: 'Turkish',
  },
  {
    value: 'iw',
    title: 'Hebrew',
  },
  {
    value: 'uk',
    title: 'Ukrainian',
  },
  {
    value: 'ja',
    title: 'Japanese',
  },
  {
    value: 'uz',
    title: 'Uzbek',
  },
  {
    value: 'kk',
    title: 'Kazakh',
  },
  {
    value: 'vi',
    title: 'Vietnamese',
  },
  {
    value: 'kn',
    title: 'Kannada',
  },
  {
    value: 'zh-CN',
    title: 'Chinese (Simlified)',
  },
  {
    value: 'ko',
    title: 'Korean',
  },
  {
    value: 'zh-TW',
    title: 'Chinese (Traditional)',
  },
  {
    value: 'ky',
    title: 'Kyrgyz',
  },
];

const sortByTitle = (a, b) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();

  let comparison = 0;

  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }

  return comparison;
};

const sortedList = list.sort(sortByTitle);

sortedList.unshift({
  value: '',
  title: 'Your PC or location langauge',
});

export default sortedList;
