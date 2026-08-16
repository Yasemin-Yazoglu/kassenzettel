# Changelog

## [2.0.0] - 16-08-2026
### Added

**User accounts**
- Email/password and Google (OAuth) sign-up and login
- Account page with avatar (real photo or initials fallback), display name, and member-since date
- Password change flow, with re-authentication required before a new password is accepted
- Account deletion flow, requiring the user to type a confirmation phrase before the irreversible action is executed


**Database**
- Migrated data storage from local browser storage (`localStorage`) to a Supabase (Postgres) database
- Row Level Security (RLS) policies ensure each user can only read, insert, update, or delete their own expense data
- Indexed queries for fast lookups by user and spending date
- Optimistic UI updates: new, edited, and deleted expenses appear instantly in the interface while the database write happens in the background


**Analytics dashboard**
- Spending trend chart (switchable between weekly, monthly, and yearly views, with navigation between past periods)
- Shopping frequency chart, sharing the same view as the spending trend via a metric toggle

**Legal pages**
- Impressum, Datenschutzerklärung, and Nutzungsbedingungen pages, linked from the app footer

### Changed

**UI**
- Consistent visual system applied across the app (shared card styling, consistent modal design, consistent button and input styling)
- Modernized the edit and delete confirmation modals to match the rest of the app
- Improved accessibility: proper heading structure, accessible labels on icon-only buttons, keyboard-friendly navigation

## [1.1.0] - 01-03-2026
### Added
- Add feature that enables editing and deleting spendings

## [1.0.1] - 22-02-2026
### Fixed
- Display spendings in chronological order
- Enable entering decimal numbers in the input field

## [1.0.0] - 17-02-2026
### Added
- Initial release