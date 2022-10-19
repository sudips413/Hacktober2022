/*
    author: Rishi Mohan Jha
*/

#include<bits/stdc++.h>
using namespace std;	

void Merge(vector<int> &v, int l, int mid, int h){
	int i = l, j = mid + 1, k = 0;
	vector<int> temp(h - l + 1);

	while(i <= mid && j <= h){
		if(v[i] < v[j])
			temp[k++] = v[i++];
		else
			temp[k++] = v[j++];
	}

	while(i <= mid)
		temp[k++] = v[i++];

	while(j<=h)
		temp[k++] = v[j++];

	k = 0;
	for(int t = l; t <= h; t++)
		v[t] = temp[k++];
}

void RecursiveMergeSort(vector<int> &v, int l, int h){
	if(l < h){
		int mid = l + (h - l) / 2;
		RecursiveMergeSort(v, l, mid);
		RecursiveMergeSort(v, mid + 1, h);
		Merge(v, l, mid, h);
	}
}

void Solve() {
	int n;
	cin >> n;

	vector<int> v(n);
	for(int i=0; i<n; i++)
		cin >> v[i];

	RecursiveMergeSort(v, 0, n-1);

	debug(v);

}

int main() {
      ios_base::sync_with_stdio(false);
      cin.tie(NULL);  int T = 1;
      while (T--) Solve();
}
