# import the necessary packages
import numpy as np
import pymongo


class Searcher:
    #def __init__(self):
    # store our index path
    #self.indexPath = indexPath

    def search(self, imageID, limit, descript):
        # initialize our dictionary of results
        results = {}

        # open the index file for reading
        #with open(self.indexPath) as f:
        # initialize the CSV reader
        #reader = csv.reader(f)

        # loop over the rows in the index
        #for row in reader:
        # parse out the image ID and features, then compute the
        # chi-squared distance between the features in our index
        # and our query features
        client = pymongo.MongoClient("localhost", 27017)
        db = client.mm

        if int(descript) == 1:
            query = db.index.find_one({"imageID" : int(imageID)})
            queryFeature = [float(x) for x in query["featuresEH"].split()]
            for row in db.index.find({"imageID" :{"$ne" : int(imageID)} }).limit(50000):
             features = [float(x) for x in row["featuresEH"].split()]
             d = self.chi2_distance(features, queryFeature)
             results[row["imageID"]] = d
         
        elif int(descript) == 2:
            query = db.index.find_one({"imageID" : int(imageID)})
            queryFeature = [float(x) for x in query["featuresHT"].split()]
        
            for row in db.index.find({"imageID" :{"$ne" : int(imageID)} }).limit(50000):
             features = [float(x) for x in row["featuresHT"].split()]
             d = self.chi2_distance(features, queryFeature)
             results[row["imageID"]] = d
        elif int(descript) == 3:
            query = db.index.find_one({"imageID" : int(imageID)})
            queryFeatureEH = [float(x) for x in query["featuresEH"].split()]
            for row in db.index.find({"imageID" :{"$ne" : int(imageID)} }).limit(50000):
             features = [float(x) for x in row["featuresEH"].split()]
             dEH = self.chi2_distance(features, queryFeatureEH)
            queryFeatureHT = [float(x) for x in query["featuresHT"].split()]
            for row in db.index.find({"imageID" :{"$ne" : int(imageID)} }).limit(50000):
             features = [float(x) for x in row["featuresHT"].split()]
             dHT = self.chi2_distance(features, queryFeatureHT)
             results[row["imageID"]] = (dEH+dHT)/2

         
        
            #  d = self.chi2_distance(features, queryFeature)

            # # now that we have the distance between the two feature
            # # vectors, we can udpate the results dictionary -- the
            # # key is the current image ID in the index and the
            # # key is the current image ID in the index and the
            # # value is the distance we just computed, representing
            # # how 'similar' the image in the index is to our query
            #  results[row["imageID"]] = d

        # close the reader
        #f.close()

        # sort our results, so that the smaller distances (i.e. the
        # more relevant images are at the front of the list)
        results = sorted([(v, k) for (k, v) in results.items()])

        # return our (limited) results
        return results[:limit]


    def chi2_distance(self, histA, histB, eps=1e-10):
    # compute the chi-squared distance
     d = 0.5 * np.sum([((a - b) ** 2) / (a + b + eps)
                      for (a, b) in zip(histA, histB)])

    # return the chi-squared distance
     return d