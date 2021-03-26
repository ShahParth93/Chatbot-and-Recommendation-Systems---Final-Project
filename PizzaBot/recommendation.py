import pandas as pd
import numpy as np
#import requests as req
import random
from collections import Counter


menus = pd.read_csv('./menus.csv')

users = pd.read_csv('./users.csv')

def mealsIngredient(utilisateur,ingredient):
    #returns a list of meals eaten by the user based on the ingredient
    reco = []
    caracteristiqueUser = users[users["IdUser"]==utilisateur]
    if(caracteristiqueUser.empty):
        while(len(reco)<3):
            m = menus.iloc[random.randint(0,len(menus))]["Meal"]
            cook = menus[menus["Meal"]==m]

            for i in range(2,len(cook.columns)):#ingredient qu'il a mangé
                #print(cook[cook.columns[i]])
                #print(cook.iloc[0,i])
                #print(cook[i].item)
                if((cook.iloc[0,i]) and (type(cook.iloc[0,i])== str)):
                    if((ingredient.lower() in cook.iloc[0,i].lower()) or (cook.iloc[0,i].lower() == ingredient.lower())):
                        #print(m)
                        #for k in range(caracteristiqueUser.iloc[0][m]):
                        if (m not in reco ):
                            reco.append(cook.iloc[0,1])
                        break

    #print(caracteristiqueUser)
    else:
        for m in users.columns[1:]:

            if (caracteristiqueUser.iloc[0][m] != 0):
                #print (m)#les meals qu'il a mangé
                cook = menus[menus["Meal"]==m]
                #print(cook["Meal"])
                for i in range(2,len(cook.columns)):#ingredient qu'il a mangé
                    #print(cook[cook.columns[i]])
                    #print(cook.iloc[0,i])
                    #print(cook[i].item)
                    if((cook.iloc[0,i]) and (type(cook.iloc[0,i])== str)):
                        if((ingredient.lower() in cook.iloc[0,i].lower()) or (cook.iloc[0,i].lower() == ingredient.lower())):
                            #print(m)
                            for k in range(caracteristiqueUser.iloc[0][m]):
                                reco.append(cook.iloc[0,1])
                            break
    return reco


def propositionIngredient(utilisateur,ingredient):
    #returns the most common ingredient from the meals eaten by a user
    ListeIngredient = []
    caracteristiqueUser = users[users["IdUser"]==utilisateur]
    for m in users.columns[1:]:
        #print(m)
        if (caracteristiqueUser.iloc[0][m] != 0):
            #print (m)#les meals qu'il a mangé
            cook = menus[menus["Meal"]==m]
            #print(cook["Meal"])
            for i in range(2,len(cook.columns)):
                if((cook.iloc[0,i]) and (type(cook.iloc[0,i])== str)):
                    if(cook.iloc[0,i].lower() != ''):
                        ListeIngredient.append(cook.iloc[0,i].lower())
    lr = Counter(ListeIngredient).most_common() [0] [0]  
    if lr == ingredient :
        lr = Counter(ListeIngredient).most_common() [1] [0]  
    return lr


def propositionMeal(utilisateur,ingredient):
    reco = mealsIngredient(utilisateur,ingredient)
    #print(reco)
    caracteristiqueUser = users[users["IdUser"]==utilisateur]
    if(caracteristiqueUser.empty):
        return reco
    else:
        commonIngredient = propositionIngredient(utilisateur,ingredient)

        asking = False
        for i in range(len(menus)):
            for j in menus.columns:
                if (menus.iloc[i][j] and (type(menus.iloc[i][j])== str)):
                    if (menus.iloc[i][j].lower()==ingredient.lower()):
                        asking = True
                        #print(menus.iloc[i])
                    if (asking and (menus.iloc[i][j].lower()==commonIngredient.lower())) :
                        if (menus.iloc[i]["Meal"] not in reco):
                            reco.append(menus.iloc[i]["Meal"])

            asking= False 

        return reco
        
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

    users.to_csv("C:PizzaBot/users.csv",index=False,header=True)

import sys
ingredient = sys.argv[2]
#print(ingredient)
#ingredient ="beef"
sender = int(sys.argv[1])
#print(sender)
print(propositionMeal(sender,ingredient))

#mealsIngredient("6348204667888287",'beef')
#myname = input('Type your name: ')
#print('Hello parth')

#print(users.loc[users["IdUser"]=="6348204667888287"])
#print(users[users['IdUser']==6348204667888287])


#marche
#print(propositionMeal(3952382904814442,"eggs"))
