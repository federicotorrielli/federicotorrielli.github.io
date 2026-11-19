/** Builds mailto links in the browser, so the address never sits in the HTML. */
export function revealEmails() {
  document.querySelectorAll<HTMLAnchorElement>("a[data-u][data-d]").forEach((a) => {
    a.href = `mailto:${a.dataset.u}@${a.dataset.d}`;
  });
}
