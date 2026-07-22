# Idea how we could implement the new Header and Tabs
Rough sketch of how we could handle the header with tabbed navigation.

## Highlevel Overview
We have 3 views
1. Logged in User
2. Owner not logged In
3. Viewing someone else's profile

## Implementation Idea
### Build WebComponents in either solid-ui or solid-panes so they can be reused.
- Full Header 
  Move the header from profile-pane and adjust to create the web component. Just a note that I think this will also need the ViewerMode to conditionally render the buttons (edit for owner, add to friends for authenticated) like it is now in HeaderSection.ts
- Tab navigation
  This would be setup to be configurable. Use slots to pass in the pane. It would be something like
  ```
  TabbedConfiguration {
    label: string,
    pane: Pane
  }
- Tabbed header - the above combined 
  conditionally render the header component above based on the tabbed selected (profile-pane = fullheader), otherwise display name.
  ```
  tabbedSelected
  
  <div>
  (tabbedSelected = 'profile') ? <full-header></full-header> : <h1>${name}</h1>
  <tabbed-navigation></tabbed-navigation>
  </div>
  ```
### Profile-pane
- In the HeadingSection.ts conditionally render 
```
isOwner ? <full-header></full-header> : <tabbed-header></tabbed-header>
```

