import { xxHash32 } from "https://raw.githubusercontent.com/gnlow/deno-xxhash/master/mod.ts";
import { assertEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { config, plot } from "./mod.ts";

const width = 60;
const line = "\n" + "_".repeat(width + 9) + "\n";

const test = (name: string, plot: string, hash: string) => {
  Deno.test(name, () => {
    let strHash = xxHash32(plot).toString(16);
    assertEquals(strHash, hash);
  });
  console.log(`\n${name}\n`);
  console.log(plot);
  console.log(line);
}


/**
 * Basic test with default configs
 */
let s0 = new Array(width);
for (var i = 0; i < s0.length; i++) s0[i] = 15 * Math.sin(i * ((Math.PI * 4) / s0.length));

test('basic', plot(s0), 'd3d0c64a')


/**
 * Custom height
 */
var config: config = { height: 10 };

var s1 = [];
for (var i = 0; i < width; i++) s1[i] = 15 * Math.cos(i * ((Math.PI * 8) / width)); // values range from -15 to +15

test('config / height', plot(s1, config), '386a5ab5')


/**
 * Custom y-axis limits
 */
config.min = -20;
config.max = 20;

test('config / y-axis bounds', plot(s1, config), '6d43b15f')


/**
 * Custom drawing symbols
 */
config.symbols = ["┣", "┣", "╶", "╴", "─", "╰", "╭", "╮", "╯", "│"];

test('config / symbols', plot(s1, config), 'a2e939e9')


/**
 * Auto range
 */
var s2 = new Array(width);
s2[0] = Math.round(Math.random() * 15);
for (i = 1; i < s2.length; i++) s2[i] = s2[i - 1] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2));

test('auto-range', plot(s2), xxHash32(plot(s2)).toString(16))


/**
 * Single value
 */
var s3 = new Array(width);
for (i = 0; i < width; i++) s3[i] = 1.0;

test('single value', plot(s3), 'e1b21647')

/**
 * Multiple disjoint arrays
 */
var arr1 = new Array(width);
for (var i = 0; i < arr1.length; i++) arr1[i] = 5 * Math.sin(i * ((Math.PI * 4) / arr1.length));

var arr2 = new Array(width);
for (var i = 0; i < arr2.length; i++) arr2[i] = arr1[i] + 2;

test('multiple / disjoint', plot([arr1, arr2]), '1be5184f')


/**
 * Multiple disjoint arrays
 */
var arr1 = new Array(width);
for (var i = 0; i < arr1.length; i++) arr1[i] = 5 * Math.sin(i * ((Math.PI * 4) / arr1.length));

var arr2 = new Array(width);
for (var i = 0; i < arr2.length; i++) arr2[i] = 5 * Math.sin(Math.PI + i * ((Math.PI * 4) / arr2.length));

test('multiple / intersecting', plot([arr1, arr2]), '6529337c')


/**
 * Colors on one array
 */
var arr1 = new Array(width);
for (var i = 0; i < arr1.length; i++) arr1[i] = 5 * Math.sin(i * ((Math.PI * 4) / arr1.length));

var config: config = { colors: ['blue'] };

test('colors / single', plot(arr1, config), '481bfdb9')


/**
 * Colors on multiple arrays
 */
var arr1 = new Array(width);
for (var i = 0; i < arr1.length; i++) arr1[i] = 5 * Math.sin(i * ((Math.PI * 4) / arr1.length));

var arr2 = new Array(width);
for (var i = 0; i < arr2.length; i++) arr2[i] = 5 * Math.sin(Math.PI + i * ((Math.PI * 4) / arr2.length));

var arr3 = new Array(width);
for (var i = 0; i < arr3.length; i++) arr3[i] = 5 - i * 0.2;

var arr4 = new Array(width);
for (var i = 0; i < arr4.length; i++) arr4[i] = 10 + 5 * Math.cos(i * ((Math.PI * 4) / arr1.length));

var config: config = { colors: ['blue', 'green', 'magenta', 'red'] };

var series = [arr1, arr2, arr3, arr4];

test('colors / multiple', plot(series, config), '39aa6d67')
