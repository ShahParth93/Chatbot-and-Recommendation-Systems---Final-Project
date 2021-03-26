import pandas as pd
import numpy as np
#import requests as req
import random
from collections import Counter


menus = pd.read_csv('./menus.csv')

users = pd.read_csv('./users.csv')

def choice(utilisateur,meal):
    #add a meal that the user ordered. Works also with new users
    userExist = False
    for i in range(len(users)):
        if utilisateur == users.loc[i]["IdUser"]:
            print("ok")
            userExist = True
            for j in users.columns:
                if j.lower() == meal.lower() :
                    print(meal)
                    users.loc[i][j]+=1

    if(userExist == False):
        menu = [0]*(len(users.columns)-1)
        dico ={}
        dico[users.columns[0]] = utilisateur

        for j in range(1,len(users.columns)):
            dico[users.columns[j]]=menu[j-1]

        users = users.append(dico, ignore_index=True)
        for i in range(len(users)):
            if utilisateur == users.loc[i]["IdUser"]:
                print("ok")
                userExist = True
                for j in users.columns:
                    if j.lower() == meal.lower() :
                        print(meal)
                        users.loc[i][j]+=1

    users.to_csv("./users.csv",index=False,header=True)

import sys
meal = sys.argv[2]
#print(ingredient)
#ingredient ="beef"
sender = int(sys.argv[1])

choice(sender,meal)