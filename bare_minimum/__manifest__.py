{
    'name': "My library",
    'summary': "Manage books easily",
    'description': """ some description over here""",
    'author': "oto",
    'website': "odeosoft.com",
    'category': 'Uncategorized',
    'version': '13.0.1',
    'depends': ['base','new_schools','clickacrm_transactions'],
    'data': [
        'views/library_book.xml',
        'views/main_displayer.xml'

    ],
    'qweb': [
        "static/src/xml/popups.xml",
        "static/src/xml/convertion-ftds.xml",
        "static/src/xml/convertion-today.xml",
        "static/src/xml/retention-deposit.xml",
        "static/src/xml/retention-today.xml",
        "static/src/xml/testx.xml",

    ]

}
