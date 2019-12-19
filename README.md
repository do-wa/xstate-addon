# WARNING

this project is not actively developed, not tested and based on xstate v3.2 and storybook v3.4

# xstate-addon
A storybook addon project for xstate (https://github.com/davidkpiano/xstate)

The project is in an early stage. 
Everyone who is interested in bringing this project forward is welcome to contribute ideas, docs and code. 

## install


```javascript
npm i storybook-addon-xstate -D
```

### register

addons.js
```javascript
import 'storybook-addon-xstate/register';
```

### story

```javascript
import { WithXStateGraph } from 'storybook-addon-xstate';

<WithXStateGraph
   machine={xstateMachine}
   onTransition={onEvent}
   currentState={currentState}
>
  <TrafficLight light={currentState} />
 </WithXStateGraph>
```


## basic idea
![Basic Idea](https://github.com/do-wa/xstate-addon/blob/master/poc.gif)
