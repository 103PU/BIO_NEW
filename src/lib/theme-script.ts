export const ThemeScript = () => {
    const code = `(function() {
    function getTheme() {
      const persistedTheme = window.localStorage.getItem('theme');
      const hasPersistedPreference = typeof persistedTheme === 'string';
      if (hasPersistedPreference) {
        return persistedTheme;
      }
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof mql.matches === 'boolean';
      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
      }
      return 'light';
    }
    const theme = getTheme();
    document.documentElement.dataset.theme = theme;
  })();`;
    return <script dangerouslySetInnerHTML={ { __html: code } } />;
};
