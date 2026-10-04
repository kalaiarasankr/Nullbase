# NullBase

**NullBase** is an independent, open-source community layout catalogue for Null's Clash.

## Features

- Responsive layout browser
- Search and filters
- Town Hall/level categories
- War/Home categories
- Layout preview
- Favorites with browser local storage
- Copy layout share link
- Open layout in Null's Clash
- JSON-based layout catalogue
- GitHub Pages deployment workflow
- Contributor and issue templates

## Run locally

Because the site loads `data/layouts.json`, use a local web server.

### Python

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Add a layout

Add an object to `data/layouts.json`:

```json
{
  "id": 5,
  "name": "TH18 Example Base",
  "level": "18",
  "type": "war",
  "tags": ["war", "anti-3-star"],
  "description": "Short description.",
  "image": "assets/layouts/th18-example.png",
  "link": "YOUR_VALID_NULLS_CLASH_SHARE_LINK"
}
```

Test the share link on a device with Null's Clash installed before submitting it.

## GitHub Pages

The repository includes `.github/workflows/pages.yml`. Push to the `main` branch and enable GitHub Pages using **GitHub Actions** as the source.

## Roadmap

- [x] Initial catalogue
- [x] Search and filters
- [x] Favorites
- [x] Layout detail view
- [x] Null's Clash share-link action
- [ ] Real community layout database
- [ ] User submissions
- [ ] Admin/moderation tools
- [ ] Popular/trending sorting
- [ ] Link validation
- [ ] Backend/API

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).

## Disclaimer

NullBase is an independent community project. It is not affiliated with, endorsed by, or sponsored by Null's Clash or Supercell.

Third-party names, trademarks, logos, screenshots, and game assets remain the property of their respective owners.
