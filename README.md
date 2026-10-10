# Driver Incident & Safety Assistant — Two-screen React UI

A mobile-first React/Vite prototype that visually follows the two reference screens supplied by the user: the Driver Safety home page and the Report Incident form.

## Included pages

1. **Home** — Driver Incident & Safety Assistant heading, blue Report Incident card, My Incidents and Safety Guidelines visual cards, and the reference-style Home / Incidents / Profile bottom bar. Only the Report Incident card navigates to a second page; the other cards/tabs are visual placeholders by design.
2. **Report Incident** — compact navy header and a simple vertically aligned form for Driver, Vehicle, Route, Incident Type, Location, Date & Time, Vehicle Condition, and Cargo Status, plus a blue Next button.

## Scope

This is a frontend-only UI prototype. It does not connect to ServiceNow and does not create/query records. The sample field values match the values shown in the supplied reference image. The Next button shows a notice that submission is not connected.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Use a mobile browser or resize your browser to a phone viewport to compare with the references.

## Design basis

- ServiceNow Horizon: https://horizon.servicenow.com/native-mobile/screens/input-form-screen
- ServiceNow Horizon colors: https://horizon.servicenow.com/native-mobile/foundations/native-mobile-colors
- ServiceNow Horizon structure: https://horizon.servicenow.com/native-mobile/basics/structure

The UI is a visual approximation of the user-provided ServiceNow-inspired screenshots, not an official ServiceNow app or brand asset pack.
