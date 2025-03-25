# Global Spinner

## Global Spinner Concept
 
While we perform Api calls, most of the time we want the page show indication that page load, this is why we need loader.
The global Spinner feather in harmony do it easily and automatic without any effort.

Any time there is "pending" request in the network, global spinner will be display.
That mean in redux speak - any time we have network task, we will have value greater than 1 in store under `feedbackHandler` slice.

If we have an api call that we don't want a spinner for, we can remove it. 
For more info, see [Api calls](#api-calls) section.