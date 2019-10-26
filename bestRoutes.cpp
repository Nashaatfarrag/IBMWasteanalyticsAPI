#include<bits/stdc++.h>

using namespace std;

#define all(x) x.begin(), x.end()

struct Bin{
    int id, x, y;
    Bin(int _id, int _x, int _y): id(_id), x(_x), y(_y){};
    Bin(){};
};

struct Route{
    vector<Bin> bins;
};

int main(){

    int n;
    cin >> n;

    vector<Bin> bins(n);

    for(auto &bin : bins){
        cin >> bin.id >> bin.x >> bin.y;
    }

    vector<vector<pair<double, int>>> nearestTo(n);

    for(int i = 0; i < n; ++i){
        for(int j = i + 1; j < n; ++j){
            double dist =  hypot(bins[i].x - bins[j].x, bins[i].y - bins[j].y); // should be replaced with Google Maps API call to find the shortest path between two points
            nearestTo[i].push_back({dist, j});
            nearestTo[j].push_back({dist, i});
        }
        sort(all(nearestTo[i])); // sort according to closest
        reverse(all(nearestTo[i])); // closest is at the back
    }


    vector<bool> alreadyTaken(n, false);

    const int LIMIT = 5;

    vector<Route> routes;

    for(int i = 0; i < n; ++i){
        if(alreadyTaken[i]) continue;
        int count = 1;
        int index = i;
        Route route; // creates a new route
        route.bins.push_back(bins[index]); // add this bin
        alreadyTaken[index] = true; // mark it as taken

        while(count < LIMIT){ // takes the best 5 for a give route
            int next_id = -1;
            while(not nearestTo[index].empty()){
                next_id = nearestTo[index].back().second;
                nearestTo[index].pop_back();
                if(not alreadyTaken[next_id]) break; // found a valid next bin
            }
            if(next_id == -1 || alreadyTaken[next_id]) break;
            index = next_id;
            route.bins.push_back(bins[index]);
            alreadyTaken[index] = true;
            count++;
        }

        routes.push_back(route); // add it to the result routes
    }

    int it = 1;
    for(auto &route : routes){
        cout << "Route #" << it++ << ": " << endl;
        for(auto &bin : route.bins){
            cout << "(id: " << bin.id << ", x: " << bin.x << ", y: " << bin.y << ")" << endl;
        }
        cout << "---------------------------!" << endl;
    }

    return 0;
}
