import requests
import threading

def makeRequest(reqNo):
    print("Making {}th request".format(reqNo))
    result =requests.get('http://localhost:3000')
    print("Request no: {} complete.".format(reqNo))

allThreads = []
for i in range(100):
    thrd = threading.Thread(target=makeRequest, args=(i+1,))
    thrd.start()
    allThreads.append(thrd)

# wait till all requests finishes
for thrd in allThreads:
    thrd.join()

print("Stress testcase complete!")