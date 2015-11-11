# USAGE
# python index.py --dataset dataset --index index.csv

# import the necessary packages
from pyimagesearch.colordescriptor import ColorDescriptor
import argparse
import glob
import cv2
import pymongo


datasetEH = "C:\\Users\\MAG\\Documents\\MEGA\\projet\\riadh_lundi\\tutorial\\image retrieve\\cbir\\eh_descriptors"
datasetHT = "C:\\Users\\MAG\\Documents\\MEGA\\projet\\riadh_lundi\\tutorial\\image retrieve\\cbir\\ht_descriptors"
datasetTags = "C:\\Users\\MAG\\Documents\\MEGA\\projet\\riadh_lundi\\tutorial\\image retrieve\\cbir\\tags\\meta\\tags"
index = "C:\\Users\\MAG\\Documents\\MEGA\\projet\\riadh_lundi\\tutorial\\image retrieve\\cbir\\eh_descriptors\\"



client = pymongo.MongoClient("localhost", 27017)
db = client.mm

imageID=1
# use glob to grab the image paths and loop over them
for FileEH, FileHT, indice  in zip(glob.glob(datasetEH + "/*.txt"),glob.glob(datasetHT + "/*.txt"), glob.glob(datasetTags + "/*")):
	output1 = open(FileEH, "r")
	output2 = open(FileHT, "r")
	lignes1 = output1.read().splitlines()
	lignes2 = output2.read().splitlines()
	Tags_fileid = indice[indice.rfind("\\") + 1:] 
	for featuresEH, featuresHT, FileTags in zip(lignes1,lignes2,glob.glob(datasetTags + "/" +Tags_fileid+"/*.txt")):
		output3 = open(FileTags, "r")
		lignes3 = output3.read().splitlines()
		db.index.insert_one({"imageID": imageID, "featuresEH": featuresEH , "featuresHT": featuresHT, "tags": lignes3 }).inserted_id
		imageID+=1
		output3.close()
# close the index file
output1.close()
output2.close()
