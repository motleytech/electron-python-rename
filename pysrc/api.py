from __future__ import print_function
import sys
import zerorpc
import os

def rename(files, code, doit=False):
        outNames = []
        for fullpath in files.split('\n'):
            head, name = os.path.split(fullpath)
            exec(code)
            newFullpath = os.path.join(head, name)
            if doit:
                if fullpath != newFullpath:
                    os.rename(fullpath, newFullpath)
            outNames.append(newFullpath)
        return '\n'.join(outNames)


class RenameApi(object):
    def previewRename(self, files, code):
        """based on the input text, return the int result"""
        try:
            return rename(files, code)
        except Exception as e:
            from traceback import format_exc
            return format_exc()

    def rename(self, files, code):
        """based on the input text, return the int result"""
        try:
            return rename(files, code, doit=True)
        except Exception as e:
            from traceback import format_exc
            return format_exc()

    def echo(self, text):
        """echo any text"""
        return text

def parse_port():
    return '4242'

def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    s = zerorpc.Server(RenameApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()

if __name__ == '__main__':
    main()