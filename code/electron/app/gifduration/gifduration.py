#!/usr/bin/env python
# encoding: utf-8
'''
This script takes one or more animated GIF files as input and calculates their
total durations, returning zero for non-animated GIF files.

Requires Pillow, formerly known as the Python Imaging Library (PIL).

Code by Markus Amalthea Magnuson <markus.magnuson@gmail.com>
'''

from __future__ import print_function

import sys
import getopt
import os.path
from PIL import Image, ImageSequence


help_message = '''
Supply one or more animated GIF files as input to get their total durations.
'''


class Usage(Exception):
    def __init__(self, msg):
        self.msg = msg


def main(argv=None):
    if argv is None:
        argv = sys.argv
    try:
        try:
            opts, args = getopt.getopt(argv[1:], 'h:v', ['help', 'verbose'])
        except getopt.error as err:
            raise Usage(err.msg)

        # Option processing.
        verbose = False
        for option, value in opts:
            if option in ('-v', '--verbose'):
                verbose = True
            if option in ('-h', '--help'):
                raise Usage(help_message)

    except Usage as err:
        print >> sys.stderr, sys.argv[0].split('/')[-1] + ': ' + str(err.msg)
        print >> sys.stderr, '\t for help use --help'
        return 2

    # Start processing the images.
    for path in args:
        try:
            im = Image.open(path)
        except IOError as err:
            print >> sys.stderr, '%s:' % os.path.basename(path)
            print >> sys.stderr, err
            print >> sys.stderr, '---'
            continue

        durations = []
        for frame in ImageSequence.Iterator(im):
            try:
                durations.append(frame.info['duration'])
            except KeyError:
                # Ignore if there was no duration, we will not count that frame.
                pass

        if not durations:
            print('Not an animated GIF image')
        else:
            if verbose:
                for index, duration in enumerate(durations):
                    print('Frame %d: %d ms (%0.2f seconds)' % (index + 1, duration, duration / 1000.0))
            total_duration = sum(durations)
            # print('Total dur: %d ms (%0.2f seconds)' % (total_duration, total_duration / 1000.0))
            # return total_duration
            print(total_duration)
        #print('---')

if __name__ == '__main__':
    sys.exit(main())
