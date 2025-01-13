# Terminal Portfolio

This is my portfolio htat is supposed to mirror my terminal that I use everyday, with some creative changes added! :)
![Terminal Portfolio](https://i.imgur.com/CNOedPP.jpeg)

## Features

- 🖥️ Interactive Terminal Interface
- 📊 Real-time System Monitoring
- 📱 Responsive Design with Mobile Support
- 💬 Comment System with Profanity Filter
- 🎨 ASCII Art Display
- 📝 Markdown Content Viewer

## Available Commands

- `help` - Display available commands
- `about` - View personal information
- `experience` - Display work experience
- `skills` - List technical skills
- `projects` - Show project portfolio
- `contact` - Display contact information
- `art` - Show random ASCII art
- `comment` - View all comments
- `comment -m "message"` - Add a new comment
- `clear` - Clear the terminal

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Supabase
- Vite
- Lucide React Icons

## Environment Variables

The project requires the following environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

### Comments Table
```sql
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

## Features in Detail

### Terminal Interface
- Custom terminal emulator with command history
- Markdown rendering for formatted content
- Command-line style interaction

### System Monitor
- Real-time CPU usage simulation
- Memory usage monitoring
- Network activity tracking
- ASCII-based graphs

### Mobile Support
- Responsive design for mobile devices
- Alternative interface for small screens
- Quick access to important links
- Clear call-to-action for desktop version

### Comment System
- Profanity filtering using PurgoMalum API
- Real-time comment updates
- Timestamp-based sorting
- Public read/write access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Bryer Cowan - email@bryercowan.com

[bryercowan.com](https://www.bryercowan.com)
