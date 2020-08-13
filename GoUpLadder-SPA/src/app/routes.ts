import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BalanceMemberComponent } from './balance/balance-member/balance-member.component';
import { BalanceVisitorComponent } from './balance/balance-visitor/balance-visitor.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { WebsiteDisclaimerComponent } from './website-disclaimer/website-disclaimer.component';
import { BalanceMemberResolver } from './_resolvers/balance-member.resolver';
import { BalanceLearnMoreComponent } from './balance/balance-learn-more/balance-learn-more.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent,
                resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent, 
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
            {path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}},
            {path: 'about', component: AboutComponent},
            {path: 'contact', component: ContactComponent},
            {path: 'balance-member', component: BalanceMemberComponent, resolve: {user: BalanceMemberResolver}},
            {path: 'balance-visitor', component: BalanceVisitorComponent},
            {path: 'terms-of-service', component: TermsOfServiceComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent},
            {path: 'website-disclaimer', component: WebsiteDisclaimerComponent},
            {path: 'balance-learn-more', component: BalanceLearnMoreComponent},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
