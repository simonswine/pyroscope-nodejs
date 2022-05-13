# Pyroscope nodejs package

## Modes

Pyroscope supports two main operation modes: 
 * Push mode
 * Pull mode

Push mode means the package itself uploads profile data to a pyroscope server, when pull mode means you provide pyroscope server with an endponts to scrape profile data

NodeJS Pyroscope module supports collecting wall-time and heap. More details you may find [here](https://cloud.google.com/profiler/docs/concepts-profiling)

## Push mode

Usage is differs for first you need to import and init pyroscope module.
Module is available for both CommonJS and ESM variants, so you can use it the way it fits your project.

### Javascript

```
const Pyroscope = require('pyroscope');

Pyroscope.init({server: 'http://pyroscope:4040'});
Pyroscope.start()
```

### Typescript:
```
import Pyroscope from 'pyroscope';

Pyroscope.init({server: 'http://pyroscope:4040'});
Pyroscope.start()
```

Once you `init` you may `startCpuProfiling()` and/or `startHeapProfiling()`. 

## Pull Mode

In order to enable pull mode you need to implement follwing endpoints:
 * `/debug/pprof/profile` -- for wall-time profiling
 * `/debug/pprof/heap` -- for heap profiling

You may implement your own enpoints with Pyroscope API, like in the example:

```javascript
app.get('/debug/pprof/profile', async function handler(req, res) {
  console.log('Collecting Cpu for', req.query.seconds);
  try {
    const p = await Pyroscope.collectCpu(req.query.seconds);
    res.send(p);
  } catch (e) {
    console.error('Error collecting cpu', e);
    res.sendStatus(500);
  }
});
```

Once you `init` you may `startCpuProfiling()` and/or `startHeapProfiling()`. 

## Pull Mode

In order to enable pull mode you need to implement follwing endpoints:
 * `/debug/pprof/profile` -- for wall-time profiling
 * `/debug/pprof/heap` -- for heap profiling

You may implement your own enpoints with Pyroscope API, like in the example:

```javascript
app.get('/debug/pprof/profile', async function handler(req, res) {
  console.log('Collecting Cpu for', req.query.seconds);
  try {
    const p = await Pyroscope.collectCpu(req.query.seconds);
    res.send(p);
  } catch (e) {
    console.error('Error collecting cpu', e);
    res.sendStatus(500);
  }
});
```

or you may use express middleware. 

```javascript
import Pyroscope, { expressMiddleware } from '@pyroscope/nodejs'

Pyroscope.init()
const app = express()
app.use(expressMiddleware);
```

then you also need to configure your pyroscope server by providing config file 

```yaml
---
log-level: debug
scrape-configs:
  - job-name: testing            # any name 
    enabled-profiles: [cpu, mem] # cpu and mem for wall and heap
    static-configs:
      - application: rideshare
        spy-name: nodespy        # make pyroscope know it's node profiles
        targets:
          - localhost:3000       # address of your scrape target
        labels:     
          env: dev               # labels

```
### Debugging

Use `DEBUG` env var set to `pyroscope` to enable debugging messages. Otherwise all messages will be suppressed.

`DEBUG=pyroscope node index.js`
## API
### Configuration

```
init(c : PyroscopeConfig)

```

Configuration options
```
interface PyroscopeConfig {
    serverAddress: string;
    sourceMapPath?: string[];
    appName: string;
    tags: Record<string, any>;
    authToken?: string
}
```

### CPU Profiling
```javascript
// Start collecting 10s i and upload to server
Pyroscope.startCpuProfiling()
Pyroscope.stopCpuProfiling()

// Or do it manually
Pyroscope.collectCpu(seconds?:number);
```
### Heap Profiling
```javascript
// Start heap profiling and upload to server
Pyroscope.startHeapProfiling()
Pyroscope.stopHeapProfiling()

// Or do it manually
Pyroscope.startHeapCollecting()
Pyroscope.collectHeap();
Pyroscope.stopHeapCollecting()
```

