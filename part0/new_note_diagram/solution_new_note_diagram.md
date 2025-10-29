# Exercise 0.4: New note diagram
This is a sequence diagram that shows the sequence of events when user adding a new note in the `https://studies.cs.helsinki.fi/exampleapp/notes` page.
<br><br>
By: Rachmat Purwa Saputra

```mermaid
sequenceDiagram
    %% Small notes:
    Note left of browser: assuming the `exampleapp/notes`<br>has already been served for the user
    Note left of browser: user now entering the input<br>and hit the button

    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: New URL to redirect to `exampleapp/notes`
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: the HTML file of `notes` page
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code<br>that fetches the JSON from the server<br>at the end of fetched JavaScript<br><br>xhttp.open("GET", "/exampleapp/data.json", true)

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "god forgive me", "date": "2025-10-28T15:03:50.673Z" }, ... ]
    deactivate server

    Note right of server: An array of JSON object is given to browser

    Note left of browser: The browser executes<br>the callback function<br>that renders the notes.
    Note left of browser: Create new ul element,<br>appending each data into li.<br>And finally appending the filled ul<br>to element with id notes.

```
