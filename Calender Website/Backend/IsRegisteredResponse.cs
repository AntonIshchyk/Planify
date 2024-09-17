public class IsRegisteredResponse{
    
    bool IsRegistered;
    string AdminUsername;
    public IsRegisteredResponse(bool isregistered, string adminusername){
        AdminUsername = adminusername;
        IsRegistered = isregistered;
    }
}