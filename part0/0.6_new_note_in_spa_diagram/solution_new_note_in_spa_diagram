# Exercise 0.6: New note in Single page app diagram
This is a sequence diagram that shows the sequence of events when user adding a new note in the `https://studies.cs.helsinki.fi/exampleapp/spa` page.
<br><br>
By: Rachmat Purwa Saputra.

```mermaid
sequenceDiagram
    %% Small notes:
    Note left of browser: assuming the `exampleapp/spa`<br>has already been served for the user
    Note left of browser: user now entering the input<br>and hit the button

    participant browser
    participant server

    Note left of browser: prevent browser from reloading<br>then create a new note object<br>then push to local client's notes arr<br>And also emptying the input text<br><br>Then, redraw the local list of notes

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Responded with 201 Created status code
    server-->>browser: {message: "note created"}
    deactivate server

    Note right of server: at this point, server's note array is<br>filled with new incoming data, perhaps<br>updating the array content if<br>the length will be more than 100.

    Note left of browser: This process will be the same for<br>new notes added by browser. There is<br>no more fetching html, css, or javascript.
    Note left of browser: The browser will maintain local array<br>for each new input from this client<br>Until they reloading their page, so<br>the local array will be updated from the server's.
```
