/**
 * The example screens printed at the end of each component in
 * design-system/DESIGN-SYSTEM.md, and the icons they use.
 *
 * The rest of the document says what a component measures; these show what it
 * is for, in the situations a product actually puts it in. They are kept apart
 * from the generator because they are markup, not measurements, and every
 * `pui-` class they use is still checked against the built CSS by
 * design-system-check.mjs.
 *
 * The library ships no icons. The examples use the author's own `icon icon-*`
 * classes, one CSS mask per SVG file (section 1.6), so the same markup works
 * with either set in ICONS.
 */

/** Section number → the examples printed under it. */
export const EXAMPLES = {
  4.1: [
    {
      title: "Sign up",
      intro:
        "The main action is solid, the alternative is an outline in the surface role, and the way out is a link. The icon sits beside the label; the button's 4px gap spaces it.",
      html: `<button class="pui-btn pui-solid pui-theme" type="submit">
  <i class="icon icon-user-plus"></i> Create account
</button>
<button class="pui-btn pui-outline pui-surface" type="button">
  <i class="icon icon-mail"></i> Sign up with email
</button>
<a class="pui-btn pui-link pui-theme" href="/login">I already have an account</a>`
    },
    {
      title: "Destructive confirmation",
      intro: "A pill for the final step, in the error role.",
      html: `<button class="pui-btn pui-solid pui-error pui-rounded-full">
  <i class="icon icon-trash-2"></i> Delete repository
</button>`
    }
  ],
  4.2: [
    {
      title: "Active filters",
      intro:
        "Each filter is a soft chip with a remove button inside it. The chip's gap spaces the icon, the label and the button.",
      html: `<span class="pui-chip pui-soft pui-theme">
  <i class="icon icon-map-pin"></i> São Paulo
  <button type="button" aria-label="Remove São Paulo"><i class="icon icon-x"></i></button>
</span>
<span class="pui-chip pui-soft pui-theme">
  <i class="icon icon-calendar"></i> Last 30 days
  <button type="button" aria-label="Remove Last 30 days"><i class="icon icon-x"></i></button>
</span>
<span class="pui-chip pui-outline pui-success pui-rounded-full">
  <i class="icon icon-circle-check"></i> Verified
</span>`
    }
  ],
  4.3: [
    {
      title: "Unread count and status",
      intro:
        "A pill badge carries a count inside a button. A soft badge labels a status beside a title.",
      html: `<button class="pui-btn pui-outline pui-surface">
  <i class="icon icon-bell"></i> Inbox
  <span class="pui-badge pui-solid pui-error pui-rounded-full">3</span>
</button>

<h3>Payment API <span class="pui-badge pui-soft pui-success">Operational</span></h3>
<h3>Search <span class="pui-badge pui-soft pui-warn">Degraded</span></h3>`
    }
  ],
  4.4: [
    {
      title: "Contact info",
      intro:
        "A header band names the card; the content area stacks the rows with its 12px gap, so the rows need no margins.",
      html: `<div class="pui-card">
  <div class="pui-card-header">Contact</div>
  <div class="pui-card-content">
    <strong>Ana Souza</strong>
    <span><i class="icon icon-mail"></i> ana@example.com</span>
    <span><i class="icon icon-phone"></i> +55 11 91234-5678</span>
    <span><i class="icon icon-map-pin"></i> Av. Paulista, 1000, São Paulo</span>
    <a class="pui-btn pui-solid pui-theme" href="mailto:ana@example.com">
      <i class="icon icon-send"></i> Send message
    </a>
  </div>
</div>`
    },
    {
      title: "Alerts",
      intro:
        "The same card with a style class and a color class, and no header band. The role attribute tells a screen reader whether to interrupt.",
      html: `<div class="pui-card pui-soft pui-warn" role="alert">
  <div class="pui-card-content">
    <strong><i class="icon icon-triangle-alert"></i> Your trial ends in 3 days</strong>
    Add a payment method to keep your projects online.
  </div>
</div>

<div class="pui-card pui-soft pui-success" role="status">
  <div class="pui-card-content">
    <strong><i class="icon icon-circle-check"></i> Changes saved</strong>
  </div>
</div>

<div class="pui-card pui-solid pui-error" role="alert">
  <div class="pui-card-content">
    <strong><i class="icon icon-circle-x"></i> Payment failed</strong>
    Your card was declined. Try another one.
  </div>
</div>`
    }
  ],
  4.5: [
    {
      title: "Recent files",
      intro:
        "A hoverable list with no bullets. The selected item is soft in the theme role.",
      html: `<ul class="pui-list pui-hoverable" style="list-style: none">
  <li class="pui-list-item pui-soft pui-theme" aria-current="true">
    <i class="icon icon-file-text"></i> Q3 report.pdf
  </li>
  <li class="pui-list-item"><i class="icon icon-image"></i> Team photo.png</li>
  <li class="pui-list-item"><i class="icon icon-sheet"></i> Budget 2027.xlsx</li>
  <li class="pui-list-item">
    <i class="icon icon-folder"></i> Archive
    <span class="pui-badge pui-soft pui-muted">12</span>
  </li>
</ul>`
    }
  ],
  4.6: [
    {
      title: "Invoices",
      intro:
        "A striped table flush inside a card, with a status badge per row, an icon button per row and a footer for the total.",
      html: `<div class="pui-card">
  <div class="pui-card-header">Invoices</div>
  <table class="pui-table pui-striped">
    <thead>
      <tr><th>Invoice</th><th>Date</th><th>Status</th><th>Amount</th><th></th></tr>
    </thead>
    <tbody>
      <tr>
        <td>#1042</td><td>Sep 1, 2026</td>
        <td><span class="pui-badge pui-soft pui-success">Paid</span></td>
        <td>$120.00</td>
        <td><button class="pui-btn pui-link pui-theme" aria-label="Download #1042"><i class="icon icon-download"></i></button></td>
      </tr>
      <tr>
        <td>#1043</td><td>Sep 15, 2026</td>
        <td><span class="pui-badge pui-soft pui-warn">Pending</span></td>
        <td>$80.00</td>
        <td><button class="pui-btn pui-link pui-theme" aria-label="Download #1043"><i class="icon icon-download"></i></button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr><th colspan="3">Total</th><th>$200.00</th><th></th></tr>
    </tfoot>
  </table>
</div>`
    }
  ],
  4.7: [
    {
      title: "Frequently asked questions",
      intro:
        "The same name on every item keeps one open at a time, and the marked variant shades the open one. The icons sit in the summary before the label.",
      html: `<div class="pui-accordion pui-highlighted">
  <details class="pui-accordion-item" name="faq" open>
    <summary><i class="icon icon-credit-card"></i> How am I billed?</summary>
    <p>Monthly, on the day you subscribed. Cancel any time.</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary><i class="icon icon-users"></i> Can I invite my team?</summary>
    <p>Yes. Every plan includes up to five members.</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary><i class="icon icon-shield"></i> Where is my data stored?</summary>
    <p>In data centers in the region you pick when you sign up.</p>
  </details>
</div>`
    }
  ],
  4.8: [
    {
      title: "Request permission",
      intro:
        "A card inside the dialog. The buttons open and close it with no script of yours. The row of actions is the author's own layout, because the content area stacks its children.",
      html: `<button class="pui-btn pui-solid pui-theme" commandfor="notify" command="show-modal">
  <i class="icon icon-bell"></i> Turn on notifications
</button>

<dialog class="pui-modal" id="notify" closedby="any" aria-labelledby="notify-title">
  <div class="pui-card">
    <div class="pui-card-header" id="notify-title">
      <i class="icon icon-bell-ring"></i> Allow notifications?
    </div>
    <div class="pui-card-content">
      We will let you know when someone mentions you or a build fails.
      You can change this later in Settings.
      <div style="display: flex; gap: 8px; justify-content: flex-end">
        <button class="pui-btn pui-outline pui-surface" commandfor="notify" command="close">
          Not now
        </button>
        <button class="pui-btn pui-solid pui-theme" commandfor="notify" command="close">
          <i class="icon icon-check"></i> Allow
        </button>
      </div>
    </div>
  </div>
</dialog>`
    }
  ],
  4.9: [
    {
      title: "Account menu",
      intro:
        "The list inside the panel is required: it gives the rows their padding and their hover. The panel opens under the end of the trigger, as a menu in a page header does.",
      html: `<button class="pui-btn pui-outline pui-surface" popovertarget="account">
  <i class="icon icon-circle-user"></i> Ana <i class="icon icon-chevron-down"></i>
</button>

<div class="pui-dropdown pui-align-end" id="account" popover>
  <ul class="pui-list pui-hoverable" style="list-style: none">
    <li class="pui-list-item"><i class="icon icon-user"></i> Profile</li>
    <li class="pui-list-item"><i class="icon icon-settings"></i> Settings</li>
    <li class="pui-list-item"><i class="icon icon-life-buoy"></i> Help</li>
    <li class="pui-list-item"><i class="icon icon-log-out"></i> Sign out</li>
  </ul>
</div>`
    }
  ],
  "4.10": [
    {
      title: "Icon buttons",
      intro:
        "A button with only an icon names itself in a tooltip. The dark variant is the solid inverse pair.",
      html: `<button class="pui-btn pui-outline pui-surface" interestfor="copy-tip" aria-label="Copy link">
  <i class="icon icon-link"></i>
</button>
<div class="pui-tooltip" id="copy-tip" popover="hint">Copy link</div>

<button class="pui-btn pui-outline pui-surface" interestfor="share-tip" aria-label="Share">
  <i class="icon icon-share-2"></i>
</button>
<div class="pui-tooltip pui-bottom pui-solid pui-inverse" id="share-tip" popover="hint">
  Share with your team
</div>`
    }
  ],
  4.11: [
    {
      title: "Sign-up fields",
      intro:
        "A label, the control and a message, stacked with a 4px gap. The second field is invalid, so its border and its message take the error color.",
      html: `<label class="pui-field-group">
  <span>Email</span>
  <input class="pui-input" type="email" placeholder="you@example.com" aria-describedby="email-help">
  <small id="email-help">We never share your email.</small>
</label>

<label class="pui-field-group">
  <span>Password</span>
  <input class="pui-input" type="password" aria-invalid="true" aria-describedby="password-help">
  <small id="password-help"><i class="icon icon-circle-alert"></i> At least 8 characters.</small>
</label>`
    }
  ],
  4.12: [
    {
      title: "Contact form",
      intro:
        "The same class on a text field, a select and a textarea. Each control is set to full width by the author.",
      html: `<input class="pui-input" type="text" placeholder="Your name" style="width: 100%">
<select class="pui-input" style="width: 100%">
  <option>Sales</option>
  <option>Support</option>
  <option>Billing</option>
</select>
<textarea class="pui-input" rows="4" placeholder="How can we help?" style="width: 100%"></textarea>`
    }
  ],
  4.13: [
    {
      title: "Search and website",
      intro:
        "An icon in an addon before the control and a button after it. A text addon fixes the part of a value the user does not type.",
      html: `<div class="pui-input-group">
  <span class="pui-addon"><i class="icon icon-search"></i></span>
  <input class="pui-input" type="search" placeholder="Search projects">
  <button class="pui-btn pui-solid pui-theme">Search</button>
</div>

<div class="pui-input-group">
  <span class="pui-addon">https://</span>
  <input class="pui-input" value="perfectui.dev">
  <span class="pui-addon"><i class="icon icon-globe"></i></span>
</div>`
    }
  ],
  4.14: [
    {
      title: "Notification preferences",
      intro:
        "Switches for settings that apply at once, radios for one choice among several and a checkbox for consent. The success color on the switch needs no style class.",
      html: `<label><input type="checkbox" class="pui-switch" checked> <i class="icon icon-mail"></i> Email</label>
<label><input type="checkbox" class="pui-switch pui-success" checked> <i class="icon icon-smartphone"></i> Push</label>

<label><input type="radio" class="pui-radio" name="digest" checked> Daily digest</label>
<label><input type="radio" class="pui-radio" name="digest"> Weekly digest</label>

<label><input type="checkbox" class="pui-checkbox"> I agree to the terms of service</label>`
    }
  ],
  4.15: [
    {
      title: "Order tracking",
      intro:
        "Each checkpoint icon is colored like a badge and holds an icon of its own. Steps not reached yet are an outline in the muted role.",
      html: `<figure class="pui-timeline">
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-success"><i class="icon icon-check"></i></i>
    <article><strong>Order placed</strong><p>Sep 20, 10:14</p></article>
  </figcaption>
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-theme"><i class="icon icon-truck"></i></i>
    <article><strong>Shipped</strong><p>Sep 22, 08:30</p></article>
  </figcaption>
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-outline pui-muted"><i class="icon icon-house"></i></i>
    <article><strong>Delivered</strong><p>Expected Sep 25</p></article>
  </figcaption>
</figure>`
    }
  ],
  4.16: [
    {
      title: "Toolbar and newsletter",
      intro:
        "Icon buttons joined into one control, and an input fused with its button.",
      html: `<div class="pui-group-row" role="toolbar" aria-label="Formatting">
  <button class="pui-btn pui-outline pui-surface" aria-label="Bold"><i class="icon icon-bold"></i></button>
  <button class="pui-btn pui-outline pui-surface" aria-label="Italic"><i class="icon icon-italic"></i></button>
  <button class="pui-btn pui-outline pui-surface" aria-label="Underline"><i class="icon icon-underline"></i></button>
</div>

<div class="pui-group-row">
  <input class="pui-input" type="email" placeholder="you@example.com" aria-label="Email">
  <button class="pui-btn pui-solid pui-theme"><i class="icon icon-send"></i> Subscribe</button>
</div>`
    }
  ],
  4.17: [
    {
      title: "Compose button",
      intro: "A pill button pinned to the corner of the viewport.",
      html: `<button class="pui-btn pui-solid pui-theme pui-rounded-full pui-float">
  <i class="icon icon-pencil"></i> New message
</button>`
    }
  ]
};

/**
 * Every icon the examples use: the class name, which is Lucide's, and the file
 * that draws it in each set. Checked against lucide-static 1.48.0 and
 * bootstrap-icons 1.13.1; Lucide 1.x has no brand icons, which is why nothing
 * here is a logo.
 */
export const ICONS = {
  bell: "bell",
  "bell-ring": "bell-fill",
  bold: "type-bold",
  calendar: "calendar",
  check: "check",
  "chevron-down": "chevron-down",
  "circle-alert": "exclamation-circle",
  "circle-check": "check-circle",
  "circle-user": "person-circle",
  "circle-x": "x-circle",
  "credit-card": "credit-card",
  download: "download",
  "file-text": "file-earmark-text",
  folder: "folder",
  globe: "globe",
  house: "house",
  image: "image",
  italic: "type-italic",
  "life-buoy": "life-preserver",
  link: "link-45deg",
  "log-out": "box-arrow-right",
  mail: "envelope",
  "map-pin": "geo-alt",
  pencil: "pencil",
  phone: "telephone",
  search: "search",
  send: "send",
  settings: "gear",
  "share-2": "share",
  sheet: "file-earmark-spreadsheet",
  shield: "shield",
  smartphone: "phone",
  "trash-2": "trash",
  "triangle-alert": "exclamation-triangle",
  truck: "truck",
  underline: "type-underline",
  user: "person",
  "user-plus": "person-plus",
  users: "people",
  x: "x"
};
