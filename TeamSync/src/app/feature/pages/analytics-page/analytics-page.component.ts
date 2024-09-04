import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post/post.model";
import {AnalyticsService} from "../../analytics/analytics.service";
import {ChartData, ChartOptions, ChartType, ChartTypeRegistry} from "chart.js";
import {User} from "../../../shared/users/models/user.model";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {UserService} from "../../../shared/users/user.service";
import {ActiveUserDTO} from "../../analytics/active-user-dto.model";
import {GroupService} from "../../services/group.service";
import {Group} from "../../models/group/group.model";
import "../../analytics/chart-config";
import {GroupPostsDTO} from "../../analytics/group-posts-dto.model";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.css'
})
export class AnalyticsPageComponent implements OnInit {
  loggedUser!: User;
  mostPopularPosts: Post[] = [];
  groupPosts: GroupPostsDTO[] = [];
  mostActiveUsers: ActiveUserDTO[] = [];
  groups: Group[] = [];
  selectedGroupId: number | null = null;
  selectedPopularPostsPeriod: string = 'this month';
  selectedGroupPostsPeriod: string = 'this month';
  selectedMostActiveUsersPeriod: string = 'this month';

  // POPULAR USERS CHART
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Activity Count'
      }
    ]
  };

  // GROUP POSTS STATS
  doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || '';
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  constructor(private analyticsService: AnalyticsService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private groupService: GroupService) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.fetchMostPopularPosts('this month');
    this.fetchAllGroups();
    this.fetchGroupPostsStats();
  }

  fetchMostPopularPosts(period: string): void {
    this.analyticsService.getMostPopularPosts(period).subscribe(posts => {
      this.mostPopularPosts = posts;
    });
  }

  fetchMostActiveUsers(): void {
    if (this.selectedGroupId !== null) {
      this.analyticsService.getMostActiveUsers(this.selectedGroupId, this.selectedMostActiveUsersPeriod)
        .subscribe({
          next: (activeUsers: ActiveUserDTO[]) => {
            this.mostActiveUsers = activeUsers;
            this.updateUsersChart();
          },
          error: (err) => {
            console.error("Error fetching most active users: ", err);
          }
        });
    }
  }

  fetchGroupPostsStats(): void {
    this.analyticsService.getGroupPostsStats(this.selectedGroupPostsPeriod)
      .subscribe({
        next: (groupPosts: GroupPostsDTO[]) => {
          this.groupPosts = groupPosts;
          this.updateGroupPostsChart();
          console.log(groupPosts);
        },
        error: (err) => {
          console.error("Error fetching group posts stats: ", err);
        }
      });
  }

  fetchAllGroups(): void {
    this.groupService.getAll().subscribe(groups => {
      this.groups = groups;
      if (this.groups.length > 0) {
        this.selectedGroupId = this.groups[0].id;
        this.fetchMostActiveUsers();
      }
    });
  }

  getLoggedUser(){
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.userService.getByExternalId(userId).subscribe({
          next: (user: User) => {
            this.loggedUser = user;
          }
        });
      }
    });
  }

  onPostDeletion($event: Post) {
    this.fetchMostPopularPosts(this.selectedPopularPostsPeriod);
  }

  onPopularPostsPeriodChanged() {
    this.fetchMostPopularPosts(this.selectedPopularPostsPeriod);
  }

  onMostActiveUsersPeriodChanged() {
    this.fetchMostActiveUsers();
  }

  onGroupChanged() {
    this.fetchMostActiveUsers();
  }

  updateUsersChart(): void {
    const labels = this.mostActiveUsers.map(user => `${user.user.firstName} ${user.user.lastName}`);
    const data = this.mostActiveUsers.map(user => user.activityCount);

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Activity Count',
          backgroundColor: '#42A5F5'
        }
      ]
    };
  }

  updateGroupPostsChart(): void {
    const labels = this.groupPosts.map((groupPost) => groupPost.group.name);
    const data = this.groupPosts.map((groupPost) => groupPost.postsCount);

    this.doughnutChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };
  }

  onGroupPostsPeriodChanged() {
    this.fetchGroupPostsStats();
  }
}
