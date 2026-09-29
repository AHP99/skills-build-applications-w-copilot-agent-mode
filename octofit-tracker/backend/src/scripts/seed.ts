import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    console.log('Seed the octofit_db database with test data');

    const teamData = [
      { name: 'Trail Blazers', description: 'A team focused on running and outdoor movement.' },
      { name: 'Core Crew', description: 'A team building strength through consistent training.' },
    ];
    const teamsByName = new Map<string, mongoose.Types.ObjectId>();

    for (const team of teamData) {
      const savedTeam = await Team.findOneAndUpdate(
        { name: team.name },
        { $set: team },
        { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true },
      );
      teamsByName.set(team.name, savedTeam._id);
    }

    const userData = [
      { username: 'maya.chen', email: 'maya.chen@octofit.example', displayName: 'Maya Chen', grade: '10', team: 'Trail Blazers', points: 120 },
      { username: 'omar.rivera', email: 'omar.rivera@octofit.example', displayName: 'Omar Rivera', grade: '11', team: 'Trail Blazers', points: 95 },
      { username: 'leo.brooks', email: 'leo.brooks@octofit.example', displayName: 'Leo Brooks', grade: '9', team: 'Core Crew', points: 110 },
      { username: 'ava.patel', email: 'ava.patel@octofit.example', displayName: 'Ava Patel', grade: '12', team: 'Core Crew', points: 100 },
    ];
    const usersByUsername = new Map<string, mongoose.Types.ObjectId>();
    const membersByTeam = new Map<string, mongoose.Types.ObjectId[]>();

    for (const user of userData) {
      const { team: teamName, ...userFields } = user;
      const savedUser = await User.findOneAndUpdate(
        { username: user.username },
        { $set: { ...userFields, team: teamsByName.get(teamName) } },
        { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true },
      );
      usersByUsername.set(user.username, savedUser._id);
      const members = membersByTeam.get(teamName) ?? [];
      members.push(savedUser._id);
      membersByTeam.set(teamName, members);
    }

    for (const team of teamData) {
      await Team.updateOne({ name: team.name }, { $set: { members: membersByTeam.get(team.name) ?? [] } });
    }

    const activityData: Array<{
      username: string;
      type: 'running' | 'walking' | 'strength';
      durationMinutes: number;
      distanceKm?: number;
      points: number;
      loggedAt: string;
    }> = [
      { username: 'maya.chen', type: 'running', durationMinutes: 32, distanceKm: 4.2, points: 80, loggedAt: '2026-09-28T16:00:00.000Z' },
      { username: 'maya.chen', type: 'walking', durationMinutes: 40, distanceKm: 2.8, points: 40, loggedAt: '2026-09-27T15:30:00.000Z' },
      { username: 'omar.rivera', type: 'running', durationMinutes: 28, distanceKm: 3.6, points: 70, loggedAt: '2026-09-28T17:00:00.000Z' },
      { username: 'omar.rivera', type: 'walking', durationMinutes: 25, distanceKm: 1.9, points: 25, loggedAt: '2026-09-27T14:30:00.000Z' },
      { username: 'leo.brooks', type: 'strength', durationMinutes: 35, points: 60, loggedAt: '2026-09-28T15:00:00.000Z' },
      { username: 'leo.brooks', type: 'walking', durationMinutes: 50, distanceKm: 3.1, points: 50, loggedAt: '2026-09-27T16:30:00.000Z' },
      { username: 'ava.patel', type: 'strength', durationMinutes: 30, points: 45, loggedAt: '2026-09-28T14:00:00.000Z' },
      { username: 'ava.patel', type: 'running', durationMinutes: 24, distanceKm: 3.0, points: 55, loggedAt: '2026-09-27T17:30:00.000Z' },
    ];

    for (const activity of activityData) {
      const { username, ...activityFields } = activity;
      const user = usersByUsername.get(username);
      if (!user) throw new Error(`Missing seeded user: ${username}`);

      await Activity.findOneAndUpdate(
        {
          user,
          type: activity.type,
          durationMinutes: activity.durationMinutes,
          loggedAt: new Date(activity.loggedAt),
        },
        { $set: { ...activityFields, user, loggedAt: new Date(activity.loggedAt) } },
        { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true },
      );
    }

    for (const user of userData) {
      const userId = usersByUsername.get(user.username);
      if (!userId) throw new Error(`Missing seeded user: ${user.username}`);

      await LeaderboardEntry.findOneAndUpdate(
        { user: userId },
        { $set: { user: userId, points: user.points } },
        { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true },
      );
    }

    const workoutData = [
      {
        title: 'Easy Park Run',
        description: 'A conversational-pace run with a gentle warm-up and cool-down.',
        activityType: 'running',
        durationMinutes: 30,
        fitnessLevel: 'beginner',
        exercises: ['5-minute brisk walk', '20-minute easy run', '5-minute cool-down walk'],
      },
      {
        title: 'Walk and Reset',
        description: 'A low-impact walk to build a consistent movement habit.',
        activityType: 'walking',
        durationMinutes: 25,
        fitnessLevel: 'beginner',
        exercises: ['5-minute easy walk', '15-minute steady walk', '5-minute relaxed walk'],
      },
      {
        title: 'Bodyweight Basics',
        description: 'A balanced strength circuit using bodyweight movements.',
        activityType: 'strength',
        durationMinutes: 30,
        fitnessLevel: 'intermediate',
        exercises: ['Squats', 'Incline push-ups', 'Reverse lunges', 'Plank'],
      },
    ];

    for (const workout of workoutData) {
      await Workout.findOneAndUpdate(
        { title: workout.title },
        { $set: workout },
        { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true },
      );
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
