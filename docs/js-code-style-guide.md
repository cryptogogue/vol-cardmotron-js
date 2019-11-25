# Cryptogogue JS Code Style Guide
### Or: If Airbnb Jumped Off a Bridge, Would You?

Readability is king. Popularity of a coding style doesn't make it good. If you want to contribue to our codebase, match our style. Use your eyes and your brain. Don't dump some randomly formatted code in the middle of a file. And don't lint or restyle our code.

##### Tabs vs. Spaces

Use spaces to indent. Four (4) of them. In all cases and for all things. Yes, including your JSX.

##### Capitalization

Class names should be in TitleCase. Const should be ALL_CAPS. All other variables should be camelCase.

##### Whitespace

Include spaces before and after braces. Omit spaces between sequential groups of braces. This applies to parentheses, curly braces, square braces and angle braces. All braces, all the time.

```
let i = (( a + b ) * c ) - d [ 19 ];
```

Always add a space before the leftmost brace:

```
someFunc (( i + 1 ), 'foo' );
someObj [ index ] = getValue ( i );
```

Space anonymous functions like this:

```
onClick = {() => { return 'xyz'; }}
```

Parameters and lists get spaces after commas:

```
someFunc ( 1, 2, 3, 4, 5 );
```

##### Empty Lines

Use empty lines wherever you think they increase readability.

##### Module Dividers

Place a "thick" divider with the name of the class before a module-scoped class declaration. Place a "this" divider before any class-scoped or module-scoped function. Locally scoped functions do not need a divider.

```
//================================================================//
// MyClass
//================================================================//
class MyClass {

    //----------------------------------------------------------------//
    function classScopedFunction () {

        const locallyScopedFunc = () => {
        }
    }
}

//----------------------------------------------------------------//
function moduleScopedFunction () {
}
```

##### Scope Braces

Opening scope braces go on the same line as their scope. Closing scope braces go on their own line. If you want an extra space after opening a scope, put one:

```
if ( something ) {      // Opening the first scope.
                        // Leave a space if you want to. Or don't. Whatever.
    doSomething ();
}                       // Closing brace on its own line.
else {                  // Opening the next scope.
}                       // Closing the scope.
```

You may omit the braces from an ‘if’ statements only if all three of the following
conditions are true:
1. There is no ‘else’ clause.
2. The body of the ‘if’ is a single ‘break,’ ‘continue’ or ‘return statement.
3. The body of the ‘if’ is on the same line as the ‘if’ statement.

```
// Do not do this
if ( foo )
    return;

// Do not do this
if ( foo ) return;
else printf ( “bar\n” );

// This is OK
if ( foo ) return;
```

##### Alignment

Don't hesitate to align long blocks of initializers on tab stops if if makes your code more readable. If list alignment is good enough for menus and tables of contents, it is certainly good enough for code:

```
const foo       = 1;
const fooBar    = 2;
const fooBar2   = 'baz';
```

##### Multi-line Indentation

If you need to break a call or declaration across lines, do it consistently (i.e. for the whole call or table), and use normal indentation rules:

```
funcWithLongParamList (
    fooParam,
    barParam,
    bazParam,
    someOtherFunc (
        otherParam1,
        otherParam2,
        otherParam3
    )
);
```

##### Organization

Organize functions in modules and classes alphabetically. If your module or class is complicated enough that you think you need something other than alphabetical order, that is probably a sign that you should are doing too much. Modules and classes are the correct way to separate concerns, not name-grouping by convention.

##### var, let, const

Prefer *let* to *var*. Use *const* if you don't intend to reassign a variable.

##### The Ternary Operator
Prefer the ternary operator to if/else when appropriate:
```
const result = someCondition ? x : y;
```
##### Fallback Assignments
Fallback assignments using boolean operators are just fine:
```
const someVal = optional || defaultVal;
```

##### consts
Prefer using const variables to string and numeric literals. Declare enumerated consts as tables. Consts should be all caps, with underscores.

```
MY_ENUM = {
    OPTION_0:   'OPTION_0',
    OPTION_1:   'OPTION_1',
    OPTION_2:   'OPTION_2',
};
```

##### bind

Don't use bind. Use ad hoc anonymous functions instead:

```
onClick = {() => { this.onClick ()}}
```

##### iterators

Prefer simple for-loop iteration:

```
for ( let key in someHash ) {
}

for ( let key in someArray ) {
}

for ( let value of someArray ) {
}
```

##### Containers

Generally favor vanilla JS container types:

```
// Prefer this:
const myVector = [];
const myMap = {};
const mySet = {};

// Avoid this (unless you have a really good reason):
const myVector = new Array ();
const myMap = new Map ();
const mySet = new Set ();
```

##### async/await

Prefer async/await to promises.

##### Anonymous Functions

Prefer explicit declaration:
```
// Type it all out.
( param ) => { return x + y; }

// Dont do this.
param => x + y
```

##### React

Use functional components and hooks.

##### Mobx and Decorators

We use Mobx and decorator syntax. We don't use Redux. Deal with it.

##### JSX

Go ahead and use the JSX control statements:

```
<If condition = { checkSomething ()}>
    <Choose>
        <When condition = { checkSomethingElse ()}>
        </When>

        <Otherwise>
        </Otherwise>
    </Choose>
</If>
```
