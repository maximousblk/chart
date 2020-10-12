# asciichart

Console ASCII line charts with no dependencies.

This is a port of the npm package `asciichart` by [Igor Kroitor](https://github.com/kroitor)

<img width="700" alt="Console ASCII Line charts in pure Javascript (for NodeJS and browsers)" src="https://cloud.githubusercontent.com/assets/1294454/22818709/9f14e1c2-ef7f-11e6-978f-34b5b595fb63.png">

## Usage

```ts
import { plot } from "deno.land/x/chart/mod.ts";

var s0 = new Array(120);
for (var i = 0; i < s0.length; i++) s0[i] = 15 * Math.sin(i * ((Math.PI * 4) / s0.length));

console.log(plot(s0));
```

you can also run [test.ts](./test.ts) if you want to see how it looks.

```sh
deno run https://deno.land/x/chart/test.ts
```

### Options

The width of the chart will always equal the length of data series. The height and range are determined automatically.

```ts
var s0 = new Array(120);
for (var i = 0; i < s0.length; i++) s0[i] = 15 * Math.sin(i * ((Math.PI * 4) / s0.length));

console.log(plot(s0));
```

![](https://cloud.githubusercontent.com/assets/1294454/22818807/313cd636-ef80-11e6-9d1a-7a90abdb38c8.png)

The output can be configured by passing a second parameter to the `plot(series, config)` function. The following options are supported:

```ts
interface config {
  min?: number,      // y-axis minimum range
  max?: number,      // y-axis maximum range
  offset?: number,   // axis offset from the left (min 2)
  padding?: string,  // padding string for label formatting (can be overrided)
  height?: number,   // any height you want
  colors?: string[], // set colors for the output
  symbols?: string[] // change drawing symbols
  format?: any       // the label format function applies default padding
}
```

#### Height

```ts
var s = [];
for (var i = 0; i < 120; i++) s[i] = 15 * Math.cos(i * ((Math.PI * 8) / 120)); // values range from -15 to +15

console.log(plot(s, { height: 6 })); // this rescales the graph to 6 lines
```

![](https://cloud.githubusercontent.com/assets/1294454/22818711/9f166128-ef7f-11e6-9748-b23b151974ed.png)

#### Auto-range

```ts
var s2 = new Array(120);
s2[0] = Math.round(Math.random() * 15);
for (i = 1; i < s2.length; i++) s2[i] = s2[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

console.log(plot(s2));
```

![](https://cloud.githubusercontent.com/assets/1294454/22825525/dd295294-ef9e-11e6-93d1-0beb80b93133.png)

![](https://cloud.githubusercontent.com/assets/1294454/22818710/9f157a74-ef7f-11e6-893a-f7494b5abef1.png)

#### Multiple Series

```ts
var s2 = new Array(120);
s2[0] = Math.round(Math.random() * 15);
for (i = 1; i < s2.length; i++) s2[i] = s2[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

var s3 = new Array(120);
s3[0] = Math.round(Math.random() * 15);
for (i = 1; i < s3.length; i++) s3[i] = s3[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

console.log(plot([s2, s3]));
```

![](https://user-images.githubusercontent.com/27967284/79398277-5322da80-7f91-11ea-8da8-e47976b76c12.png)

### Colors

```ts
var arr1 = new Array(120);
arr1[0] = Math.round(Math.random() * 15);
for (i = 1; i < arr1.length; i++) arr1[i] = arr1[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

var arr2 = new Array(120);
arr2[0] = Math.round(Math.random() * 15);
for (i = 1; i < arr2.length; i++) arr2[i] = arr2[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

var arr3 = new Array(120);
arr3[0] = Math.round(Math.random() * 15);
for (i = 1; i < arr3.length; i++) arr3[i] = arr3[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

var arr4 = new Array(120);
arr4[0] = Math.round(Math.random() * 15);
for (i = 1; i < arr4.length; i++) arr4[i] = arr4[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

var config = { colors: [ 'blue', 'green', 'red', 'magenta' ] };

console.log(plot([arr1, arr2, arr3, arr4], config));
```

![](https://user-images.githubusercontent.com/27967284/79398700-51a5e200-7f92-11ea-9048-8dbdeeb60830.png)


## License

This software is distributed under [The MIT License](./LICENSE)