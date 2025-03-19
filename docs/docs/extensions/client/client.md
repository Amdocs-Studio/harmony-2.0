<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

## Client Introduction

Harmony is a client-side project that contains all the necessary code for the frontend. It is built using React, TypeScript, and Redux, with Vite as the build tool. The styling is implemented using Tailwind CSS.

## Client Folder Structure

    ├── src
        ├── modules
            ├── app-intl
                ├── Intl.i18n.ts
                ├── index.ts
                ├── components
            ├── base-styles
                ├──  styles
            ├── common-components
            ├──  sdk
                ├── hooks
                ├── modules
                    ├── module1
                        ├── Module1Api.ts
                        ├── Module1Config.ts
                        ├── Module1Reducer.ts
                        ├── Module1Types.ts
                        ├── index.ts
                        ├── useApp.ts
                    ...
                ├── services
                ├── utils
                ├── index.ts
            ├── widget1
                ├── components
                    ├── widget1.main.tsx
                ├── styles
                    ├── index.css
                ├── index.ts
                ├── idget1.i18n.ts
                ├── Widget1.tsx
                ├── Widget1.types.ts
            ├── widget2
                ├── components
                    ├── widget2.main.tsx
                ├── styles
                    ├── index.css
                ├── index.ts
                ├── Widget2.i18n.ts
                ├── Widget2.tsx
                ├── Widget2.types.ts
            ├── <MPA only>-vendors
                ├── src
                ├── index.html
                ...
            ...

In a multipage project, each module will have a designated prefix. For example, `project-prefix-widget1`.

## sdk

The SDK layer houses all business logic and API calls while providing shared code across modules, including hooks, services, utilities, and more.

## Base Technologies

  <div class="tools">        
        <div style="gap: 82px !important;" class="tools-start">
            <div class="tools-logos"><a href="https://facebook.github.io/react/" target="_blank"><img src="assets/images/icon-react.svg"/><h6 class="page-title">React</h6></a></div>
            <div class="tools-logos"><a href="http://redux.js.org/" target="_blank"><img src="assets/images/icon-redux.svg"><h6 class="page-title">Redux</h6></a></div>
            <div class="tools-logos"><a href="https://redux-toolkit.js.org/" target="_blank"><img src="assets/images/icon-redux.svg"><h6 class="page-title">Redux Toolkit</h6></a></div>    
            <div class="tools-logos"><a href="https://www.mongodb.com/" target="_blank"><img src="assets/images/icon-mongo.svg"><h6 class="page-title">MongoDB</h6></a></div>
            <div class="tools-logos"><a href="https://vite.dev/" target="_blank"><img src="assets/images/icon-vite.svg"><h6 class="page-title">Vite</h6></a></div>
            <div class="tools-logos"><a href="https://nodejs.org/en/" target="_blank"><img src="assets/images/icon-node.svg"><h6 class="page-title">Node JS</h6></a></div>
            <div class="tools-logos"><a href="https://www.typescriptlang.org/" target="_blank"><img src="assets/images/icon-ts.svg"><h6 class="page-title">TypeScript</h6></a></div>
            <div class="tools-logos"><a href="https://tailwindcss.com/" target="_blank"><img src="assets/images/icon-tailwind.svg"><h6 class="page-title">TailwindCSS</h6></a></div>
        </div>
    </div>
