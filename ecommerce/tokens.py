import random

def varification_uuid():

    uuid = [
            '9','8','7','6','5','4','3','2','1',
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            '1','2','3','4','5','6','7','8','9',
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            '9','8','7','6','5','4','3','2','1'
            ]

    uuid4 = []
    for i in range(6):
        uuid4.append(random.choice(uuid))

    uuid4 = "".join(uuid4)
    return uuid4
    



# subject = 'welcome to GFG world'
# message = f'Hi {user.username}, thank you for registering in geeksforgeeks.'
# email_from = settings.EMAIL_HOST_USER
# recipient_list = [user.email, ]
# send_mail( subject, message, email_from, recipient_list )
# code = varification_uuid()
# cache.set(username,code,120)
