# USAGE
# python search.py --index index.csv --query queries/103100.png --result-path dataset

# import the necessary packages
from pyimagesearch.colordescriptor import ColorDescriptor 
from pyimagesearch.searcher import Searcher
import argparse
import cv2
import pymongo

# my_query = "queries\\127502.png"
# dataset = "dataset"
# result = "result"

#construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--dataset", required = True,
	help = "Path to where the computed dataset will be stored")
ap.add_argument("-q", "--my_query", required = True,
	help = "Path to the query image")
ap.add_argument("-0", "--l0", required = True,
    help = "Path to the query image")
ap.add_argument("-1", "--l1", required = True,
    help = "Path to the query image")
ap.add_argument("-2", "--l2", required = True,
    help = "Path to the query image")
ap.add_argument("-3", "--l3", required = True,
    help = "Path to the query image")
ap.add_argument("-4", "--l4", required = True,
    help = "Path to the query image")
ap.add_argument("-5", "--l5", required = True,
    help = "Path to the query image")
ap.add_argument("-in", "--indice", required = True,
    help = "Path to the query image")
ap.add_argument("-r", "--result", required = True,
	help = "Path to the result path")
ap.add_argument("-d", "--descript", required = True,
    help = "Path to the result path")
args = vars(ap.parse_args())

# initialize the image descriptor
#cd = ColorDescriptor(150)

# load the query image and describe it
#features = cd.describe(query)
path = "C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/result/result.txt"
output = open(path, "w")
if(int(args["indice"]) <= 5):
 output.write(str(args["indice"])+"\n")
 output.write(str(args["l1"])+"\n")
 output.write(str(args["l2"])+"\n")
 output.write(str(args["l3"])+"\n")
 output.write(str(args["l4"])+"\n")
 output.write(str(args["l5"])+"\n")    
elif(int(args["l0"]) == 1):
 output.write(str(args["l0"])+"\n")
 output.write(str(args["my_query"])+"\n")
 output.write(str(args["l2"])+"\n")
 output.write(str(args["l3"])+"\n")
 output.write(str(args["l4"])+"\n")
 output.write(str(args["l5"])+"\n")
elif(int(args["l0"]) == 2):
 output.write(str(args["l0"])+"\n")
 output.write(str(args["l1"])+"\n")
 output.write(str(args["my_query"])+"\n")
 output.write(str(args["l3"])+"\n")
 output.write(str(args["l4"])+"\n")
 output.write(str(args["l5"])+"\n")
elif(int(args["l0"]) == 3):
 output.write(str(args["l0"])+"\n")
 output.write(str(args["l1"])+"\n")
 output.write(str(args["l2"])+"\n")
 output.write(str(args["my_query"])+"\n")
 output.write(str(args["l4"])+"\n")
 output.write(str(args["l5"])+"\n")
elif(int(args["l0"]) == 4):
 output.write(str(args["l0"])+"\n")
 output.write(str(args["l1"])+"\n")
 output.write(str(args["l2"])+"\n")
 output.write(str(args["l3"])+"\n")
 output.write(str(args["my_query"])+"\n")
 output.write(str(args["l5"])+"\n")
elif(int(args["l0"]) == 5):
 output.write(str(args["l0"])+"\n")
 output.write(str(args["l1"])+"\n")
 output.write(str(args["l2"])+"\n")
 output.write(str(args["l3"])+"\n")
 output.write(str(args["l4"])+"\n")
 output.write(str(args["my_query"])+"\n")

# output.write(str(features)+"\n")
# perform the search
#client = pymongo.MongoClient("localhost", 27017)
#db = client.mm
#row = db.index.find({ "tags" : args["tags"]  })
searcher = Searcher()
results = searcher.search(args["my_query"], 8, args["descript"])



# display the query
#cv2.imshow("Query", query)
#for (score, resultID) in results:
#print(resultID)





# loop over the results
i = 0
for (score, resultID) in results:
    i += 1  # load the result image and display it
    #matched = cv2.imread(args["dataset"] + "/im" + str(resultID) + ".jpg")
    output.write(str(resultID)+"\n")
    #cv2.imshow("Result", result)
    #cv2.waitKey(0)
    #cv2.imwrite(args["result"] + "/" + str(i) + ".jpg", matched)
output.close()
