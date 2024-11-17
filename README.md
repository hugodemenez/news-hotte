# NewsHotte

NewsHotte is your personalized news consumption platform that adapts to your preferences and lifestyle. Get news content exactly how you want it, when you want it.

## Features

- **Customizable News Sources**: Choose from a variety of trusted news outlets
- **Thematic Filtering**: Select specific themes and topics that interest you
- **Flexible Content Length**: Get news in your preferred format - from quick briefings to in-depth analysis
- **Multiple Audio Formats**:
  - Podcast-style narration
  - Interactive debate format
  - TV news broadcast style
- **Dual Content Delivery**: Access both text and audio versions of your news

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), featuring:
- Next.js 14 with App Router
- [Geist](https://vercel.com/font) font optimization
- Modern web development practices

## Development

You can start editing the application by modifying files in the `app` directory. The application auto-updates as you edit files.

## Contributing

We welcome contributions to NewsHotte! Whether it's:
- Bug reports
- Feature suggestions
- Code contributions
- Documentation improvements

Please feel free to open issues and pull requests.

### Commit Messages

We follow the Conventional Commits specification for commit messages. Each commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Example:
```
feat(auth): add Google OAuth login

- Implements Google OAuth flow
- Adds user session management
- Updates auth middleware
```

Types include:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to build process or auxiliary tools

For commit messages generation, use this prompt:
```
### Commits
Commit (Diff of Working State)
Take a deep breath and work on this problem step-by-step.
Summarize the provided diff into a clear and concisely written commit message.
Use the imperative style for the subject, use Conventional Commits (type and optionally scope), and limit the subject+type+scope to 50 characters or less. Be as descriptive as possible in the unlimited length body.
```

## Deployment

The application can be deployed on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

## License

[MIT License](LICENSE)
