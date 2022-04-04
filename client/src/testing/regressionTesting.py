
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome(
    ChromeDriverManager().install())

driver.get("http://127.0.0.1:3000")
screenHeight = driver.execute_script("return window.screen.height;")

currHeight = 0
while True:
    driver.execute_script("window.scrollTo(0, {0});".format(currHeight))
    maxHeight = driver.execute_script("return document.body.scrollHeight;")
    if(currHeight > maxHeight):
        break
    currHeight += screenHeight
    element = driver.find_element_by_class_name("MuiButtonBase-root")

    sleep(50)

