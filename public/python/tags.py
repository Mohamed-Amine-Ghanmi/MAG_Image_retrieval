import argparse
import cv2
import pymongo



#construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--dataset", required = True,
	help = "Path to where the computed dataset will be stored")
ap.add_argument("-q", "--result", required = True,
	help = "Path to the result path")
ap.add_argument("-r", "--tags", required = True,
	help = "Path to the tags path")
args = vars(ap.parse_args())



client = pymongo.MongoClient("localhost", 27017)
db = client.mm

path = "C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/result/result.txt"
output = open(path, "w")
output.write('1'+"\n")
i = 0
for row in db.index.find({ "tags" : args["tags"]  }).limit(13):
 output.write(str(row["imageID"])+"\n")
         