import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Taninsam',
  tagline: 'Functionnal library for Javascript and Typescript',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://evanliomain.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'evanliomain', // Usually your GitHub org/user name.
  projectName: 'taninsam', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/evanliomain/taninsam/blob/master/website/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   // editUrl:
        //   //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Taninsam',
      logo: {
        alt: 'Taninsam Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://github.com/evanliomain/taninsam',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Taninsam. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['../src/taninsam.ts'],
        // entryPointStrategy: 'packages',
        // exclude: '**/*+(index|.spec).ts',
        readme: 'none',
        tsconfig: '../tsconfig.json',
        // out: '.',
        plugin: ['typedoc-plugin-markdown', 'typedoc-plugin-replace-text'],
        // replaceText: {
        //   inCodeCommentText: true,
        //   inCodeCommentTags: true,
        //   inIncludedFiles: true,
        //   replacements: [
        //     {
        //       pattern: "sidebar_label: \"Exports\"",
        //       replace: "sidebar_label: \"Prout\""
        //     },
        //   ]
        // },
        frontmatter: {
          hide_title: true,
          sidebar_label: 'API',
        },
      },
    ],
  ],
};

export default config;
