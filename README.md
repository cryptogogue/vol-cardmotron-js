# Cardmotron

Cardmontron is a free tool for laying out trading card games for print. You can use it to quickly produce high-quality cardsheets for a variety of media sizes.

Cardmotron is great for prototying your game or for preparing it for print-and-play distribution. In time, more advanced features will be added to support commercial printing, including the ability to manually define page layouts.

Cardmotron is and will continue to be free to use. We developed it for our own projects are are offering it now as a gift to the hobby game development community.

#### How it Works

Cardmotron works by scanning an XLSX spreadsheet. The XLSX that contains all layouts and assets for a game is also called a *schema*.

A schema contains "layouts" and "definitions." Each layout describes an SVG document that is built up from drawing commands. The drawing commands use data specified in definitions along *handlebars* templating engine to render SVG. Drawing commands include inlined SVG templates, as well as text boxes and dynamically generated SVG graphics such as barcodes.

Most schemas will specify a layout for each type of card in the game. The definitions will contain the text, graphics and other data fields for each individual card. In other words, if your game has a card type called 'hero', they you will specify a single layout for 'hero' type cards and a unique definition for each individual hero in your game. 

Cardmotron features a powerful text formatting engine that can be used to render styled text with multiple fonts and inlined icons. Cardmotron can also dynamically align and resize text to fit inside a text box. This is key functionality, as manually formatting text using professional design tools can be time consuming and, surprisingly, dynamically fitting text to a constrained space is not widely supported by either HTML/CSS or SVG.

#### Try it Out

Download and save the reference schema *here*. Now open Cardmotron and use the file picker to load the schema. You should see a generated card inventory that looks like this:

You can sort and zoom the cards in web view mode. To prepare them for print, select your preferred media size from the drop-down and use the browser's print dialog to send your cards to a printer or save them as a .pdf.

#### License

Cardmotron is free to use. Documents produced using Cardmotron are original works and remain the sole intellectual property of the end user. Using Cardmotron and the documents it produces lawfully is the sole responsibility of the end user.

The Cardmotron source code is provided for informational purposes only. It remains the exclusive property of Cryptogogue, Inc. and is licensed to end users only for local hosting on client machines for individual use. No license to host any part of Cardmotron on a server or to produce a deriviative work based on Cardmotron's source code is granted or implied.

Modifications to Cardmotron's source code are considered derivative works. All such works are the property or Cryptogogue, Inc. and will continue to be licensed to their authors (and the public at large) in perpetuity under the original terms of this license.

Cryptogogue, Inc. make no guarantees about Cardmotron's suitability for any purpose. Do not taunt Cardmotron.

#### Contributing

If you want to contribue a bug fix or feature implementation, please follow our (code style guide)[/docs/js-code-style-guide.md] and submit pull requests via GitHub from a fork or the repository.

If you have a bug to report, prepare a clear description of the bug along repro case in the form of an XLSX and submit it to us via GitHub issues. If it doesn't affect our own use of Cardmotron, we will probably ignore it. If it doesn't have a repro case and example XLSX, we will *definitely* ignore it.

## User's Guide

### XLSX Directives

Cardmotron always scans the first sheet in your XLSX. Cardmotron is controlled by directives placed in column 'A'. Directives are followed (on the same row) by a list of parameter names. The parameter names serve as a self-documenting reminder and also allow users to reorganize the order of parameters as they see fit. Directives and parameter are *case sensitive*.

In order of typical use, the supported directives are:

- *INCLUDES:* Used to break a schema up into multiple sheets.
- *FONTS:* Declares a list of font families for use in text boxes.
- *ICONS:* Declares a list of SVG icons for inlining in text.
- *LAYOUTS:* Declares a list of layouts.
- *MACROS:* Declares a list of strings for substitution into definition string fields.
- *DEFINITIONS:* Defines the data 'content' of the schema. Definitions are the 'what' of 'what is rendered'.

Directives are read in-order, as they appear. While in most cases order doesn't matter, there are exceptions. For this reason, it is good practice to avoid forward references in directives. For example, avoid referencing a font in a layout before the font is defined.

#### INCLUDES

Sometimes it's useful to break up a large schema into multiple sheets within an XLSX workbook. The INCLUDES directive provides a way to do that.

*Parameters*

- *sheet (required):* The name of another sheet in the XLSX workbook to include.

Includes are processed immediately and in-order. An include will be processed for each subsequent row containing a valid sheet name.

#### FONTS

The Cardmotron text formatting engine uses [opentype.js](https://opentype.js.org/) to load and organize fonts directly. Our implementation doesn't work with webfonts, so you have to provide URLs for statically hosted font files format you want to use. TTF and OTF font files are supported.

Note that fonts specified this way are only for use with Cardmotron's internal text formatting engine, which renders text directly to SVG paths. Counterintuitively, they cannot be referenced as part of SVG text and font directives. For those, you will need to use SVG fonts or webfonts.

*Parameters*

- *name (required):* The user-defined name of the font group (to be referenced in text boxes and text styling commands).
- *regular (required):* The URL of the base font. This font will be used for unstyled text.
- *bold (optional):* The URL of the font to be used to bold text.
- *italic (optional):* The URL of the font to be used to italic text.
- *boldItalic (optional):* The URL of the font to be used to bold italic text.

A font will be declared for each subsequent row containing a valid font group name.

#### ICONS

Icons are SVG fragments that may be inlined Cardmotron's text formatting engine. The text formatting engine can fit icons into the text line, or place them without fitting.

*Parameters*

- *name (required):* The name of the icon.
- *width (required):* The width of the icon, in layout units (used for fitting).
- *height (required):* The width of the icon, in layout units (used for fitting).
- *svg (required):* The SVG fragment.

Width and height extend top-to-bottom from the upper left document corner. They are only guidelines used for fitting; icons may be specified to exceed their frame, in which case they may dip below the text baseline or overlap adjacent glyphs.

#### LAYOUTS

A layout is a series of drawing subcommands that, when executed, compose an SVG. Unline most other directives, the layout directive expects a multi-row hierarchy of subcommands.

For ease of use, the parameters of the layout directive and each of its subcommands are composed into a single row. This means that not all cells of all rows in a layout will be used by each subcommand, or even by the layout directive itself.

Here is the list of all parameters names and their typical use by whatever commands accept them. A more detailed discussion of each individual command follows.

*All Parameters*

- *name:* The name of the layout.
- *draw:* The drawing subcommand.
- *text:* A *handlebars* template with asset fields as context. Rendered by Cardmotron into SVG paths.
- *svg:* A *handlebars* template with asset fields as context. The special field name '\$\$' substitutes the SVG rendered from the 'text' parameter.
- *x:* X translation, in layout coordinates. Default is 0.
- *y:* Y translation, in layout coordinates. Default is 0.
- *width:* Width, in layout coordinates. Default is layout width.
- *height:* Height, in layout coordinates. Default is layout height.
- *dpi:* Used to convert layout coordinates to inches for print and screen display.
- *font:* Name of the default font group to use for dynamic text styling.
- *fontSize:* Default font size to use for dynamic text styling, in layout units.
- *hAlign:* Horizontal text alignment. One of 'left', 'center' or 'right'. Default is 'left'.
- *vAlign:* Horizontal text alignment. One of 'top', 'center' or 'bottom'. Default is 'top'.
- *qrErr:* QR code error checking level. One of 'L', 'M', 'Q', 'H'. Default is 'L'.
- *qrType:* QR code type, given as an integer (1 through 40). Specify 0 to auto-select the QR type.

A layout will be declared for each subsequent row containing a valid layout name. Drawing subcommands will be applied to the layout until the next layout name is encountered.

##### LAYOUTS

The layout directive itself only takes a few parameters.

*Parameters*

- *name (required):* Each layout in the schema must have a unique name.
- *svg (optional):* Optional 'master' SVG wrapper. When specified, the '\$\$' field name represents the layout contents, rendered to SVG.
- *width (required):* Width of the layout, in layout units.
- *height (required):* Height of the layout, in layout units.
- *dpi (required):* Scales layout units to inches. Only used to define the coordinate space; doesn't effect print resolution.

##### svg

The 'svg' drawing subcommand inlines SVG into the layout. Use this if dynamic text fitting and styling isn't required. Supported SVG features are determined by your browser. In addition to vector graphics, you can use webfonts and embedded raster images. See the SVG [documentation](https://www.w3.org/Graphics/SVG/) for a full understanding of what can be done.

*Parameters*

- *draw (required):* The subcommand name, 'svg'.
- *svg (required):* A *handlebars* template with asset fields as context.

##### textbox

While SVG can do a lot, in the one specific case where you need to dynamically fit styled text into a textbox (and want a concise way to inline text styling commands), you can use Cardmotron's internal text formatting engine by specifying a textbox.

A Cardmotron textbox contains dynamically styled and fitted text. Text will be wrapped and scaled to fit in the textbox to prevent overflow.

The textbox is rendered directly to SVG paths.

*Parameters*

- *draw (required):* The subcommand name, 'textbox'.
- *text (required):* A *handlebars* template with asset fields as context.
- *svg (optional):* A *handlebars* template with asset fields as context. The special field name '\$\$' substitutes the fully-composed output of the 'text' parameter.
- *x (optional):* X translation, in layout coordinates. Default is 0.
- *y (optional):* Y translation, in layout coordinates. Default is 0.
- *width (optional):* Width, in layout coordinates. Default is layout width.
- *height (optional):* Height, in layout coordinates. Default is layout height.
- *font (required):* Name of the default font group to use for dynamic text styling.
- *fontSize (required):* Default font size to use for dynamic text styling, in layout units.
- *hAlign (optional):* Horizontal text alignment. One of 'left', 'center' or 'right'. Default is 'left'.
- *vAlign (optional):* Horizontal text alignment. One of 'top', 'center' or 'bottom'. Default is 'top'.

##### +text

Appends an additional text segment to a textbox. Each segment may have different alignment. A '+text' *must* follow a 'textbox' command, and each '+text' is appended to the last specified 'textbox'.

*Parameters*

- *draw (required):* The subcommand name, '+text'.
- *text (required):* A *handlebars* template with asset fields as context.
- *font (required):* Name of the default font group to use for dynamic text styling.
- *fontSize (required):* Default font size to use for dynamic text styling, in layout units.
- *hAlign (optional):* Horizontal text alignment. One of 'left', 'center' or 'right'. Default is 'left'.

##### qr

Instead of text paths, Cardmotron can instead embed your text into a [QR](https://en.wikipedia.org/wiki/QR_code) code. Like the 'textbox' command, the 'qr' command outputs SVG paths.

*Parameters*

- *draw (required):* The subcommand name, '+qr'.
- *text (required):* A *handlebars* template with asset fields as context. The output of this field is encoded in the QR.
- *svg (optional):* A *handlebars* template with asset fields as context. The special field name '\$\$' substitutes the QR code SVG.
- *x (optional):* X translation, in layout coordinates. Default is 0.
- *y (optional):* Y translation, in layout coordinates. Default is 0.
- *width (required):* Size (with *and* height) of the QR code. 
- *qrErr (optional):* QR code error checking level. One of 'L', 'M', 'Q', 'H'. Default is 'L'.
- *qrType (optional):* QR code type, given as an integer (1 through 40). Specify 0 to auto-select the QR type.

##### pdf417

[PDF417](https://en.wikipedia.org/wiki/PDF417) is provided as an alternative to QR.

*Parameters*

- *draw (required):* The subcommand name, '+qr'.
- *text (required):* A *handlebars* template with asset fields as context. The output of this field is encoded in the PDF417.
- *svg (optional):* A *handlebars* template with asset fields as context. The special field name '\$\$' substitutes the QR code SVG.
- *x (optional):* X translation, in layout coordinates. Default is 0.
- *y (optional):* Y translation, in layout coordinates. Default is 0.
- *width (optional):* Width, in layout coordinates. Default is layout width.
- *height (optional):* Height, in layout coordinates. Default is 1/4 of width. 

#### MACROS

Macros are user-defined string substitutions specifically for use in asset fields of type 'string'. All asset fields of type 'string' are evaluated as templates using [handlebars](https://handlebarsjs.com/) with the table of user-defined macros as context. Macro substitution is performed prior to rendering layouts.

Macros are useful if your game assets share common text or text styling commands.

*Parameters*

- *name (required):* The name of the macro.
- *value (required):* The value to substitute for the name.

A macro will be declared for each subsequent row containing a valid macro name.

#### DEFINITIONS

The definitions directive differs from other directives in that its parameters are user-defined. Also, unlike other directives, the row immediately following the directive row is reserved. In some applications, it may be used to specify the data type of user-defined parameters, but for simple layout applications it may be left blank, in which case the data type of each parameter will be 'string'.

The user-defined parameters are used to populate the data 'fields' of the definition. The values of these fields are then available to the templaing engine as layouts are rendered.

There are also two optional "control" parameters, and a special field. The "control" parameters are:

*Control Parameters*

- *\* (optional):* The number of copies of each asset to add to the inventory view.
- *@ (optional):* The typename of the definition. May contain only lowercase letters, numerals and the special character '-'. Must be unique. If omitted, will be generated (naively).

*Special Parameters*
- *layout (required):* The name of a layout (or a space and/or comma-delimited list of layout names) to render the definition. If multiple layouts are specific, they are rendered in order.

#### A Note About Fonts and CORS

Since Cardmotron uses Javascript to load the font files you specify, the server hosting those files must support (CORS)[https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS]. If it doesn'y, you can use a proxy server like the popular (CORS-anywhere)[https://cors-anywhere.herokuapp.com/].

As a convenience, https://www.cardmotron.com/cors is configured as an nginx CORS proxy. Just like CORS-anywhere, you can prefix it to your URL to proxy files and inject the necessary cors headers. As a further conventience, if your font file fails to load due to an exception, Cardmotron will retry download using the CORS proxy. **This is very slow.** Avoid it be moving your font files to a server that properly supports CORS.

You may be able to host your font files on (GitHub)[www.github.com]. You may also be able to extra direct URLs for fonts you want to use from WebFont wrappers, provided the font files are in TTF or OTF format.

#### A Note About Templating

Cardmotron usese the [handlebars](https://handlebarsjs.com/) templaing engine under the hood. Templates are evaluated in four sequential pipeline stages. First, the table of user-defined macros is used as the context for the string fields of the definitions (which are evaluated as templates). Following this, for each definition, a templating context is prepared using the definition's parameter names as keys and its fields as values. The layout is then rendered. Each drawing subcommand is given the definition context, which is used to evaluate its 'text' field (if any) prior to rendering it to SVG. The result is then added to the template context under the special key of '\$\$'. The resulting context is then used to evaluate the drawing subcommand's svg' field (if any). Finally, once all drawing commands have been rendered into SVG, the final result is assigned to the '\$\$' key and the used to evaluate the layout directive's own 'svg' field (if any).

If no 'svg' field is provided at any stage of the pipeline, then the output of the previous stage is simply forwarded to the next stage.

Here is a summary of the pipeline:

1. Macros -> Definition
2. Definition -> Drawing subcommand's 'text'
3. Definition + Drawing subcommand's 'text', rendered as SVG -> Drawing subcommand's 'svg'
4. Fully composed layout, rendered as SVG -> Layout directive's 'svg'

Step one is 'precomputed' as the schema is loaded. Steps 2-4 are performed on-demand, as each definition renders.

#### A Note About Layout Coordinates

Cardmotron renders SVGs or groups of SVGs to media (screen or print) using *inches*, which are device independent and, if properly supported by your browser, should always display your layouts in real-world dimensions. In other words, a 2.5" x 3.5" card should be exactly 2.5" x 3.5" whether it appears on your screen or on a printed page. (If it doesn't, probably blame your browser.)

That said, inches can be onerous to work with when specifying the coordinates of layout elements. For this reason, Cardmotron allows users to specify an internal per-layout coordinate system conversion in the form of 'DPI' (aka 'Dots Per Inch'). So if you are planning to use lots of print raster graphics and want to align vector elements with pixels, you might prefer to use a layout DPI of 300, which is a standard For Some Reason(tm). On the other hand, if you want everything in inches, you can set your layout DPI to 1 and use decimal coordinates. You could even enter in a DPI of 25.4 and specificy your layouts in millimeters, if that's the way you choose to live your life.

Just remember, Cardmotron's layout DPI is *only* for your convenience. Do not confuse it with your printer's DPI or your device's DPI. Since your layouts are rendered to SVG using *inches*, the internal DPI is only used to make it easier for you to specify coordinates. SVG is a vector format, so will always be displayed at the highest resolution your device supports, and your embedded raster graphics (if any) wont gain or lose any fidelity if you change the layout DPI.

#### A Note About Stacking Layouts

Both the special 'layout' field of a definition and the 'text' parameter of the 'ref' drawing subcommand accept either a single layout name or a list of layout names. On top of this, multiple 'ref' drawing subcommands may be used to build up layers of other layouts.

This feature was introduced to make reusing layout components easy. For example, you could create a frame, rules box and status box layouts, then mix and match those depending on card type.

Another use case is sharing verbose SVG elements (such as gradients) that may need to be reused over many variations of card types. For example, if you have five main resource colors in your game and wanted to create gradients for all multi-resoource cards, and variants of every standard card frame for each of those, that would be a lot of layouts. Instead, you can specify your gradients as standalone layouts and then compose all the combinations, which will a lot less verbose.

However, there is one word of caution. Even though each layout gets rendered into a single, all-incluse stand-alone SVG, in cases where multiple layouts are displayed, your browser will add all SVG elements to the DOM. That means that named SVG elements intended for use by reference can break. To avoid this, if you intend to use a layout with a named component in other layouts, use a template field from your definition to make that component name specific to the definition being rendered.

### Text Formatting

Cardmotron uses [opentype.js](https://opentype.js.org/) to render text directly to SVG paths. This is an alternative to SVG text rendering. While it more limited than what can be done with SVG, text rendered with Cardmotron can be dynamically fit to text boxes and can be styled using a concise inline syntax. SVG does not support dynamic text fitting (or even text wrapping). To do the same with SVG, you would have to lay out every card using a print layout tool (such as [Adobe InDesign](https://www.adobe.com/products/indesign.html)) and output your text to SVG text spans.

There are two types of text inlines: *embed* inlines and *style* inlines.

#### Embed Inlines

Embed inlines are used to imped SVG icons direcntly into text. Embed inlines open with '<@' and close with '>'. Embed inlines can be escaped by using a double ‘$’, i.e. '<\@\@' will not be parsed as an embed inline and will instead appear in the output text as '<@'.

Each embed inline may contain one or more icon names, separated by spaces. Specified icons with the 'ICONS' directive.

by default, icons are scaled to fit neatly on the line of text, using the metrics of the currently font. The bottom of the icon's frame will align with the text baseline, and the top of the icon's frame will align with the font's ascender. Note that most fonts specify ascenders that are slightly taller than their letterforms, to allow room for accents and superscripts.

Icon fitting may also be disabled using style commands. This is useful for icons that shouldn't scale with text being fitted to a textbox. For example, an ornamental text divider specified in layout coordinates that shouldn't shrink even if the text content changes size.

#### Style Inlines

Style inlines are used to change the apperance of text and inlined icons. Style inlines open with '<$' and close with '>'. Style inlines can be escaped by using a double ‘$’, i.e. '<\$\$' will not be parsed as a style inline and will instead appear in the output text as '<$'.

A style inline may contain one or more style options, but only one of each type of options. Option types are deduced by their format. Formats are:

- *Number*: Any integer or decimal number, including negative numbers, i.e. -123.45.
- *Hex*: A '\#' followed by any number of hexadecimal digits, i.e. #cf32c4.
- *Percentage*: A \<Number\> appended with a '%', i.e. 55%.
- *Size*: A \<Number\> appended with the letter 'p', i.e. 24p.
- *String*: Any string excluding whitespace and the special charactyer ':'.
- *Pair*: Any \<String\> followed by immediate by a ':' and another value, without whitespace, i.e. foo:bar or baz:150%.

Basic 'unnamed' options are:

- RGB or RGBA colors are indicated by 6 ot 8 digit \<Hex\>: #ff0000, #000000ff, etc.
- Relative font scale is indicated by a \<Percentage\>: 150%, 100%, 25%, etc.
- Absolute font size is indicated by a \<Size\>: 12p, 8p, 42p, etc.
- Bold is indicated by the \<String\> ‘b’.
- Italic is indicated by the \<String\> ‘i’.
- Underline is indicated by the \<String\> 'u'.
- Left alignment is indicated by the \<String\> 'l'.
- Center alignment is indicated by the \<String\> 'c'.
- Right alignment is indicated by the \<String\> 'r'.
- Any other \<String\> is interpreted as a font group name.
- Any \<Pair\> is interpreted as a 'named option' (see below).

In addition to 'unnamed' options, special 'named' options are also supported. They are:

- icon_y:\<Percent\>: Inlines icons are shifted up or down by the given <Percent> of the current font size.
- icon_fit:\<String\>: One of 'ascender' or 'none'. Enables or disables icon fitting. Default is 'ascender'.
- underline:\<Number\>: Enables underlining and sets the underline thickness.

Note that horizontal alignment options only apply at or after a newline.

Each style block is “pushed” onto a stack of text styles as it is encountered and composed with the previous styles. An empty style block causes the last style to be “popped” off the top of the stack, returning the text style to its state before the last "push".

### Tips for Working With Excel

### Additional Reading

- (Handlebars JS)[https://handlebarsjs.com/]
- (Opentype JS)[https://opentype.js.org/]
- (SVG)[https://www.w3.org/Graphics/SVG/]
- (CORS)[https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS]
