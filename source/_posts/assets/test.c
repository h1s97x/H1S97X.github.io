#include <stdio.h>
#include <string.h>

char password[8] = "123";
char yourpassword[8]= "";

while(1){
printf("please input your password:\n");
scanf("%s",yourpassword);
if(strcmp(password,yourpassword) == 0)
{
    printf("login success!\n");
    break;
}
else
{
    printf("login failed!\n");
}
}