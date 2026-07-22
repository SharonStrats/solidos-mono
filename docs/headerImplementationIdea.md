# Idea how we could implement the new Header and Tabs
Rough sketch of how we could handle the header with tabbed navigation.

## Highlevel Overview
We have 3 views.
1. Logged in User
2. Owner not logged In
3. Viewing someone else's profile

The logged in user has a completely different view that does not include the tabbed navigation.

Not logged in view and viewing someone else's profile have slightly different headers when a tab other than profile is selected. Not logged in shows the title, while viewing someone else's profile just shows the name.

It seems there are two things we need to do, build the web components for the header and tabbed navigation and change profile-pane to use them conditionally.

One other thought is the add to friends button. If we build the web components in solid-ui, I think we will need to finish off the migration of this button to solid-ui otherwise we will need to import it from profile-pane and that won't be ideal. 


## Implementation Idea
### Build WebComponents in either solid-ui or solid-panes so they can be reused.
#### Full Header 
Move the header from profile-pane and adjust to create the web component. Just a note that I think this will also need the ViewerMode to conditionally render the buttons (edit for owner, add to friends for authenticated) like it is now in HeaderSection.ts
#### Simple Header
Would just be the name and possibly the title if we keep this for the not logged in view and the buttons conditional on the ViewerMode.

#### Tab navigation
This would be setup to be configurable. Use slots to pass in the pane. It would be something like
```
TabbedConfiguration {
  label: string,
  pane: Pane
}
```
#### Tabbed header - the above combined 
conditionally render the header component above based on the tabbed selected (profile-pane = fullheader), otherwise display name. This would have the viewerMode so it can also be passed into the header.
```
tabbedSelected

<div>
(tabbedSelected = 'profile') ? <full-header></full-header> : <simple-header></simple-header>
<tabbed-navigation></tabbed-navigation>
</div>
```
### Profile-pane
#### HeadingSection.ts conditionally render 
```
isOwner ? <full-header></full-header> : <tabbed-header></tabbed-header>
```

