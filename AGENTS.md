<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the sales page as a portable SalesPageView component with its styles and small UI primitives embedded, so the requested single-file replacement needs only React, Tailwind, and Lucide.
- Keep checkout, login, and back actions callback-driven; the local preview may demonstrate callback receipt but must not simulate a real payment or account flow.
