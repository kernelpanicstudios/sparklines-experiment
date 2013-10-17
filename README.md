sparklines-experiment 0.1
=========================

This is an experiment to just prove out the goals of the D3 Reporting Engine we've been talkign about.  Essentially, the included javascript gives you an easy way to store your Data, and using a span in your code, you can draw a sparkline of this data.

*Disclaimer:* In terms of quality, this code is a heaping pile of shit right now.  I've not tested to make sure it works in browsers other than Chrome, and it instantly blows up JSHint.  This is not an example of good JavaScript.  We can clean it up later prior to making the repo public.

How to run
==========

Two options:

1) I've included a little node.js script I use to quickly spin up a development server for myself when I don't need FastCGI or other nonsense.  I think you need the "connect" module.
2) You can just spin up your own development instance of Apache or Nginx.  Just point it at the "site" folder as root.
